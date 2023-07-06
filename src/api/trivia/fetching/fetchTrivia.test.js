import { fetchTrivia } from './fetchTrivia.js';

describe('fetchTrivia', () => {
    it('should fetch data using the fetch API', async () => {
        const trivia = [{
            id: 1, question: 'question', answers: [{ id: 1, text: 'answer', isCorrect: true },
            { id: 2, text: 'answer', isCorrect: false }]
        }, {
            id: 2, question: 'question', answers: [{ id: 3, text: 'answer', isCorrect: true },
            { id: 4, text: 'answer', isCorrect: false }]
        }]
        global.fetch = jest.fn(() =>
            Promise.resolve(
                {
                    json: Promise.resolve(trivia)
                }
            )
        )
        const url = 'https://localhost:8082/api/trivia';
        const res = await fetchTrivia();
        expect(fetch).toHaveBeenLastCalledWith(url);
        expect(res).toEqual(trivia);
    });
});
