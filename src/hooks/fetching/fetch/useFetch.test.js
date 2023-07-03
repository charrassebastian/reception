import '@testing-library/jest-dom';
import { useFetch } from './useFetch';
import { act, renderHook } from '@testing-library/react';
describe('useFetch', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });
    it('should contain null for the data property of the returned object when no arguments are passed to it', () => {
        const { result } = renderHook(useFetch);
        expect(result.current.data).toBeNull();
    });
    it('should return the fetched data when an error does not happen', async () => {
        const expectedTrivia = [{ id: 1, question: 'question 1', options: [{ id: 1, text: 'option 1 for trivia 1' }, { id: 2, text: 'option 2 for trivia 1' }, { id: 3, text: 'option 3 for trivia 1' },], explanation: 'explanation 1' },
        { id: 2, question: 'question 2', options: [{ id: 4, text: 'option 1 for trivia 2' }, { id: 5, text: 'option 2 for trivia 5' }, { id: 3, text: 'option 6 for trivia 2' },], explanation: 'explanation 2' }];
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(expectedTrivia)
            })
        );
        /* only for making sure the mock works */
        const tempFunc = async () => {
            try {
                const fetched = await fetch('url');
                return await fetched.json();
            } catch (error) {
                return null;
            }
        }
        const pretendedResult = await tempFunc();
        expect(pretendedResult).toEqual(expectedTrivia);
        /* ----------------------------------- */
        const url = 'url';
        const { result } = renderHook(useFetch, url);
        const data1 = result.current.data;
        //act(() => jest.advanceTimersByTime(2000));
        const data2 = result.current.data;
        console.log('data1: ' + data1);
        console.log('data2: ' + data2);
        expect(fetch).toHaveBeenLastCalledWith(url);
        expect(data2).toEqual(expectedTrivia);
        //expect(data).toEqual(expectedTrivia);
    });
    it('should return null wen an error occurs', () => {

    });
    it('should handle errors', () => {

    });
})
