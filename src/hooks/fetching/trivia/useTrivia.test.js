import { act, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTrivia } from './useTrivia';
import { useFetch } from '../fetch/useFetch';

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
        const trivia = result.current.trivia;
        expect(trivia).toHaveLength(0);
    });
});
