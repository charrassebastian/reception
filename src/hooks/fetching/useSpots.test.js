import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSpots } from './useSpots';

describe('useSpots', () => {
    it('should return an array', () => {
        const spots = useSpots();
        expect(Array.isArray(spots)).toBeTruthy();
    })
})