import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSpots } from './useSpots';
import { useFetch } from '../fetch/useFetch';

jest.mock('../fetch/useFetch');

describe('useSpots', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    })
    it('should return an array as the first value when it does not fetch any elements', () => {
        const { result } = renderHook(useSpots);
        const spots = result.current[0];
        expect(spots).toHaveLength(0);
    });
    it('should return an empty array as the first value when an error occurs in the fetching', () => {
        useFetch.mockImplementation(() => new Error());
        const { result } = renderHook(useSpots);
        act(() => jest.advanceTimersByTime(1000));
        const spots = result.current[0];
        expect(spots).toHaveLength(0);
    });
    it('should return an array with the fetched spots as the first value when the fetch succeeds', () => {
        const data = [{ id: 1, number: 1, available: true },
        { id: 2, number: 2, available: false }]
        useFetch.mockImplementation(() => data);
        const { result } = renderHook(useSpots);
        const spots = result.current[0];
        expect(spots).toEqual(spots);
    });
    it('should return an array with two elements, the first being an array of spots and the second a function for setting the spots', () => {
        const data = [{ id: 1, number: 1, available: true },
        { id: 2, number: 2, available: false }]
        useFetch.mockImplementation(() => data);
        const { result } = renderHook(useSpots);
        act(() => jest.advanceTimersByTime(1000));
        const [spots, setSpots] = result.current;
        expect(spots).toEqual(data);
        expect(setSpots).toBeInstanceOf(Function);
    });
    it('should call useFetch with the necessary arguments to update the spots', () => {
        const data = [{ id: 1, number: 1, available: true },
        { id: 2, number: 2, available: false }]
        useFetch.mockImplementation(() => data);
        const { result } = renderHook(useSpots);
        act(() => jest.advanceTimersByTime(2000));
        const [spots, setSpots] = result.current;
        expect(spots).toEqual(data);
        setSpots(data);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/spots', 'post', data);
    });
})
