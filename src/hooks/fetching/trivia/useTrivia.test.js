import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTrivia } from './useTrivia';
import { useFetch } from '../fetch/useFetch';

jest.mock('../fetch/useFetch');

describe('useTrivia', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    })
    it('should return an array as the first value when it does not fetch any elements', () => {
        const { result } = renderHook(useTrivia);
        const trivia = result.current.triviaCollection;
        expect(trivia).toHaveLength(0);
    });
    it('should return an empty array as the first value when an error occurs in the fetching', () => {
        useFetch.mockImplementation(() => new Error());
        const { result } = renderHook(useTrivia);
        act(() => jest.advanceTimersByTime(1000));
        const trivia = result.current.triviaCollection;
        expect(trivia).toHaveLength(0);
    });
    it('should return an object with the fetched trivia as one of its properties when the fetch succeeds', () => {
        const data = [{ id: 1, number: 1, available: true },
        { id: 2, number: 2, available: false }]
        useFetch.mockImplementation(() => data);
        const { result } = renderHook(useTrivia);
        const trivia = result.current.triviaCollection;
        expect(trivia).toEqual(trivia);
    });
    it('should return an object with four elements: triviaCollection, updateTrivia, deleteTrivia and addTrivia', () => {
        const data = [{ id: 1, number: 1, available: true },
        { id: 2, number: 2, available: false }]
        useFetch.mockImplementation(() => data);
        const { result } = renderHook(useTrivia);
        act(() => jest.advanceTimersByTime(1000));
        expect(result.current).toHaveProperty('triviaCollection');
        expect(result.current).toHaveProperty('updateTrivia');
        expect(result.current).toHaveProperty('deleteTrivia');
        expect(result.current).toHaveProperty('addTrivia');
        const { triviaCollection, updateTrivia, deleteTrivia, addTrivia } = result.current;
        expect(triviaCollection).toEqual(data);
        expect(updateTrivia).toBeInstanceOf(Function);
        expect(deleteTrivia).toBeInstanceOf(Function);
        expect(addTrivia).toBeInstanceOf(Function);
    });
    it('should call useFetch with the necessary arguments to update a trivia', () => {
        const responseData = [{ id: 1, number: 1, available: true }];
        const updatedTrivia = { id: 1, number: 1, available: true };
        useFetch.mockImplementation(() => responseData);
        const { result } = renderHook(useTrivia);
        act(() => jest.advanceTimersByTime(1000));
        const { triviaCollection, updateTrivia, deleteTrivia, addTrivia } = result.current;
        expect(triviaCollection).toEqual(responseData);
        updateTrivia(updatedTrivia);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/trivia', 'patch', updatedTrivia);
    });
    it('should call useFetch with the necessary arguments to delete a trivia', () => {
        const triviaId = 1;
        const previousData = [];
        useFetch.mockImplementation(() => previousData);
        const { result } = renderHook(useTrivia);
        act(() => jest.advanceTimersByTime(1000));
        const { triviaCollection, updateTrivia, deleteTrivia, addTrivia } = result.current;
        expect(triviaCollection).toEqual(previousData);
        deleteTrivia(triviaId);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/trivia', 'delete', triviaId);
    });
    it('should call useFetch with the necessary arguments to add a trivia', () => {
        const newTrivia = { id: 2, number: 2, available: true };
        const previousData = [{ id: 1, number: 1, available: false }];
        useFetch.mockImplementation(() => previousData);
        const { result } = renderHook(useTrivia);
        act(() => jest.advanceTimersByTime(1000));
        const { triviaCollection, updateTrivia, deleteTrivia, addTrivia } = result.current;
        expect(triviaCollection).toEqual(previousData);
        addTrivia(newTrivia);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/trivia', 'post', newTrivia);
    });
});
