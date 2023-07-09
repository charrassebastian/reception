import { fetchSpots } from './fetchSpots.js';
import { baseUrl } from '../../url/url.js';

describe('fetchSpots', () => {
    it('should fetch data using the fetch API', async () => {
        const spots =
            [{ id: 1, name: '1', available: true },
            { id: 2, name: '2', available: false },
            { id: 3, name: '3', available: false },
            { id: 4, name: '4', available: true },
            { id: 5, name: '5', available: true }];
        global.fetch = jest.fn(() =>
            Promise.resolve(
                {
                    json: Promise.resolve(spots)
                }
            )
        )
        const url = baseUrl + 'spots';
        const res = await fetchSpots();
        expect(fetch).toHaveBeenLastCalledWith(url);
        expect(res).toEqual(spots);
    });
});
