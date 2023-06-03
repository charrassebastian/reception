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
        const spots = result.current.spots;
        expect(spots).toHaveLength(0);
    });
    it('should return an empty array as the first value when an error occurs in the fetching', () => {
        useFetch.mockImplementation(() => new Error());
        const { result } = renderHook(useSpots);
        act(() => jest.advanceTimersByTime(1000));
        const spots = result.current.spots;
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
    it('should return an object with four elements: spots, updateSpot, deleteSpot and addSpot', () => {
        const data = [{ id: 1, number: 1, available: true },
        { id: 2, number: 2, available: false }]
        useFetch.mockImplementation(() => data);
        const { result } = renderHook(useSpots);
        act(() => jest.advanceTimersByTime(1000));
        expect(result.current).toHaveProperty('spots');
        expect(result.current).toHaveProperty('updateSpot');
        expect(result.current).toHaveProperty('deleteSpot');
        expect(result.current).toHaveProperty('addSpot');
        const { spots, updateSpot, deleteSpot, addSpot } = result.current;
        expect(spots).toEqual(data);
        expect(updateSpot).toBeInstanceOf(Function);
        expect(deleteSpot).toBeInstanceOf(Function);
        expect(addSpot).toBeInstanceOf(Function);
    });
    it('should call useFetch with the necessary arguments to update a spot', () => {
        const responseData = [{ id: 1, number: 1, available: true }];
        const updatedSpot = { id: 1, number: 1, available: true };
        useFetch.mockImplementation(() => responseData);
        const { result } = renderHook(useSpots);
        act(() => jest.advanceTimersByTime(1000));
        const { spots, updateSpot, deleteSpot, addSpot } = result.current;
        expect(spots).toEqual(responseData);
        updateSpot(updatedSpot);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/spots', 'patch', updatedSpot);
    });
    it('should call useFetch with the necessary arguments to delete a spot', () => {
        const spotId = 1;
        const previousData = [];
        useFetch.mockImplementation(() => previousData);
        const { result } = renderHook(useSpots);
        act(() => jest.advanceTimersByTime(1000));
        const { spots, updateSpot, deleteSpot, addSpot } = result.current;
        expect(spots).toEqual(previousData);
        deleteSpot(spotId);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/spots', 'delete', spotId);
    });
    it('should call useFetch with the necessary arguments to add a spot', () => {
        const newSpot = { id: 2, number: 2, available: true };
        const previousData = [{ id: 1, number: 1, available: false }];
        useFetch.mockImplementation(() => previousData);
        const { result } = renderHook(useSpots);
        act(() => jest.advanceTimersByTime(1000));
        const { spots, updateSpot, deleteSpot, addSpot } = result.current;
        expect(spots).toEqual(previousData);
        addSpot(newSpot);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/spots', 'post', newSpot);
    });
});
