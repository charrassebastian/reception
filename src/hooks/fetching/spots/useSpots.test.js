import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
//import { useSpots } from './useSpots';
import { useFetch } from '../fetch/useFetch';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('../fetch/useFetch');

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    }
});
  
const wrapper = ({ children }) => (
<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

function useSpots(){};

export default wrapper;

describe('useSpots', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });
    it('should return an array as the first value when it does not fetch any elements', () => {
        useFetch.mockImplementation(() => {
            'borrar'
        });
        renderHook(useSpots, { wrapper });
        /*
        const { result } = renderHook(useSpots, { wrapper });
        const spots = result.current.spotCollection;
        expect(spots).toHaveLength(0);
        
    });
    /*
    it('should return an empty array as the first value when an error occurs in the fetching', () => {
        useFetch.mockImplementation(() => new Error());
        const { result } = renderHook(useSpots, { wrapper });
        act(() => jest.advanceTimersByTime(1000));
        const spots = result.current.spotCollection;
        expect(spots).toHaveLength(0);
    });
    it('should return an object with the fetched spots as one of its properties when the fetch succeeds', () => {
        const data = [{ id: 1, number: 1, available: true },
        { id: 2, number: 2, available: false }]
        useFetch.mockImplementation(() => data);
        const { result } = renderHook(useSpots, { wrapper });
        const spots = result.current.spotCollection;
        expect(spots).toEqual(spots);
    });
    it('should return an object with four elements: spotCollection, updateSpot, deleteSpot and addSpot', () => {
        const data = [{ id: 1, number: 1, available: true },
        { id: 2, number: 2, available: false }]
        useFetch.mockImplementation(() => data);
        const { result } = renderHook(useSpots, { wrapper });
        act(() => jest.advanceTimersByTime(1000));
        expect(result.current).toHaveProperty('spotCollection');
        expect(result.current).toHaveProperty('updateSpot');
        expect(result.current).toHaveProperty('deleteSpot');
        expect(result.current).toHaveProperty('addSpot');
        const { spotCollection, updateSpot, deleteSpot, addSpot } = result.current;
        expect(spotCollection).toEqual(data);
        expect(updateSpot).toBeInstanceOf(Function);
        expect(deleteSpot).toBeInstanceOf(Function);
        expect(addSpot).toBeInstanceOf(Function);
    });
    it('should call useFetch with the necessary arguments to update a spot', () => {
        const responseData = [{ id: 1, number: 1, available: true }];
        const updatedSpot = { id: 1, number: 1, available: true };
        useFetch.mockImplementation(() => responseData);
        const { result } = renderHook(useSpots, { wrapper });
        act(() => jest.advanceTimersByTime(1000));
        const { spotCollection, updateSpot, deleteSpot, addSpot } = result.current;
        expect(spotCollection).toEqual(responseData);
        updateSpot(updatedSpot);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/spot', 'patch', updatedSpot);
    });
    it('should call useFetch with the necessary arguments to delete a spot', () => {
        const spotId = 1;
        const previousData = [];
        useFetch.mockImplementation(() => previousData);
        const { result } = renderHook(useSpots, { wrapper });
        act(() => jest.advanceTimersByTime(1000));
        const { spotCollection, updateSpot, deleteSpot, addSpot } = result.current;
        expect(spotCollection).toEqual(previousData);
        deleteSpot(spotId);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/spot', 'delete', spotId);
    });
    it('should call useFetch with the necessary arguments to add a spot', () => {
        const newSpot = { id: 2, number: 2, available: true };
        const previousData = [{ id: 1, number: 1, available: false }];
        useFetch.mockImplementation(() => previousData);
        const { result } = renderHook(useSpots, { wrapper });
        act(() => jest.advanceTimersByTime(1000));
        const { spotCollection, updateSpot, deleteSpot, addSpot } = result.current;
        expect(spotCollection).toEqual(previousData);
        addSpot(newSpot);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/spot', 'post', newSpot);
    });
    */
    })
});
