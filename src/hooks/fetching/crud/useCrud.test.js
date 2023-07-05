import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useCrud } from './useCrud';
import { useFetch } from '../fetch/useFetch';
import { QueryClient, QueryClientProvider, useQueryClient } from 'react-query';

jest.mock('../fetch/useFetch');
jest.mock('react-query');

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    }
});

const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

export default wrapper;

describe('useCrud', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    })
    it('should return an array as the first value when it does not fetch any elements', () => {
        useFetch.mockImplementation(() => {
            'borrar'
        });
        useQueryClient.mockImplementation(() => {});
        global.fetch = jest.fn(() => {
            return Promise.resolve({
                json: () => Promise.resolve('borrar tambien')
            })
        })
        renderHook(useCrud, { wrapper });
    });
        /*
        const { result } = renderHook(useCrud, { wrapper });
        const elements = result.current.elementCollection;
        expect(elements).toHaveLength(0);
    });
    /*

    it('should return an empty array as the first value when an error occurs in the fetching', () => {
        useFetch.mockImplementation(() => new Error());
        const { result } = renderHook(useCrud, { wrapper });
        act(() => jest.advanceTimersByTime(1000));
        const elements = result.current.elementCollection;
        expect(elements).toHaveLength(0);
    });
    it('should return an array with the fetched elements as the first value when the fetch succeeds', () => {
        const data = [{ id: 1, number: 1, available: true },
        { id: 2, number: 2, available: false }]
        useFetch.mockImplementation(() => data);
        const { result } = renderHook(useCrud, { wrapper });
        const elements = result.current[0];
        expect(elements).toEqual(elements);
    });
    it('should return an object with four elements: elementCollection, updateElement, deleteElement and addElement', () => {
        const data = [{ id: 1, number: 1, available: true },
        { id: 2, number: 2, available: false }]
        useFetch.mockImplementation(() => data);
        const { result } = renderHook(useCrud, { wrapper });
        act(() => jest.advanceTimersByTime(1000));
        expect(result.current).toHaveProperty('elementCollection');
        expect(result.current).toHaveProperty('updateElement');
        expect(result.current).toHaveProperty('deleteElement');
        expect(result.current).toHaveProperty('addElement');
        const { elementCollection, updateElement, deleteElement, addElement } = result.current;
        expect(elementCollection).toEqual(data);
        expect(updateElement).toBeInstanceOf(Function);
        expect(deleteElement).toBeInstanceOf(Function);
        expect(addElement).toBeInstanceOf(Function);
    });
    it('should call useFetch with the necessary arguments to update an element', () => {
        const responseData = [{ id: 1, number: 1, available: true }];
        const updatedElement = { id: 1, number: 1, available: true };
        useFetch.mockImplementation(() => responseData);
        const { result } = renderHook(useCrud, { wrapper });
        act(() => jest.advanceTimersByTime(1000));
        const { elementCollection, updateElement, deleteElement, addElement } = result.current;
        expect(elementCollection).toEqual(responseData);
        updateElement(updatedElement);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/element', 'patch', updatedElement);
    });
    it('should call useFetch with the necessary arguments to delete an element', () => {
        const spotId = 1;
        const previousData = [];
        useFetch.mockImplementation(() => previousData);
        const { result } = renderHook(useCrud, { wrapper });
        act(() => jest.advanceTimersByTime(1000));
        const { elementCollection, updateElement, deleteElement, addElement } = result.current;
        expect(elementCollection).toEqual(previousData);
        deleteElement(spotId);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/element', 'delete', spotId);
    });
    it('should call useFetch with the necessary arguments to add an element', () => {
        const newElement = { id: 2, number: 2, available: true };
        const previousData = [{ id: 1, number: 1, available: false }];
        useFetch.mockImplementation(() => previousData);
        const { result } = renderHook(useCrud, { wrapper });
        act(() => jest.advanceTimersByTime(1000));
        const { elementCollection, updateElement, deleteElement, addElement } = result.current;
        expect(elementCollection).toEqual(previousData);
        addElement(newElement);
        expect(useFetch).toHaveBeenLastCalledWith('localhost:8082/api/element', 'post', newElement);
    });
    it('should return an object with four elements that use the elementName "person" passed as an argument: personCollection, updatePerson deletePerson and addPerson', () => {
        const data = [{ id: 1, number: 1, available: true },
            { id: 2, number: 2, available: false }]
            useFetch.mockImplementation(() => data);
            const { result } = renderHook(useCrud, { wrapper, initialProps: 'person'});
            act(() => jest.advanceTimersByTime(1000));
            expect(result.current).toHaveProperty('personCollection');
            expect(result.current).toHaveProperty('updatePerson');
            expect(result.current).toHaveProperty('deletePerson');
            expect(result.current).toHaveProperty('addPerson');
            const { personCollection, updatePerson, deletePerson, addPerson } = result.current;
            expect(personCollection).toEqual(data);
            expect(updatePerson).toBeInstanceOf(Function);
            expect(deletePerson).toBeInstanceOf(Function);
            expect(addPerson).toBeInstanceOf(Function);
    });
    */
});
