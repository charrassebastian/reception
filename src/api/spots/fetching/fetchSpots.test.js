import { fetchSpots } from './fetchSpots.js';

describe('fetchSpots', () => {
    it('should fetch data using the fetch API', async () => {
        const spots =
            [{ id: 1, number: 1, available: true },
            { id: 2, number: 2, available: false },
            { id: 3, number: 3, available: false },
            { id: 4, number: 4, available: true },
            { id: 5, number: 5, available: true }];
        global.fetch = jest.fn(() =>
            Promise.resolve(
                {
                    json: Promise.resolve(spots)
                }
            )
        )
        const url = 'https://localhost:8082/api/spots';
        const res = await fetchSpots();
        expect(fetch).toHaveBeenLastCalledWith(url);
        expect(res).toEqual(spots);
    });
});
