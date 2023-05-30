import '@testing-library/jest-dom';
import { useFetch } from './useFetch';

describe('useFetch', () => {
    it('should return null when no arguments are passed to it', () => {
        expect(useFetch()).toBeNull();
    })
})