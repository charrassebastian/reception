const request = require('supertest')
const { app } = require('../server');
const { store } = require('../services/trivia-service')
const { connect, getUri, closeDb } = require('../db')

const baseTrivia = { question: 'question', explanation: 'explanation', answers: [] }

beforeAll(async () => {
    const uri = await getUri()
    await connect({ uri })
})

afterAll(async () => {
    await closeDb()
})

describe('POST /trivia', () => {
    let id = null
    test('should store a new trivia', async () => {
        const response = await request(app)
        .post('/trivia')
        .send(baseTrivia)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

        const { _id, ...triviaStored } = response.body

        expect(triviaStored).toEqual(baseTrivia)
        expect(_id).toBeTruthy()
    })
    test('should get the new trivia', async () => {
        const response = await request(app)
        .get('/trivia/')
        .expect('Content-Type', /json/)
        .expect(200)
        expect(response.body).toHaveLength(1)
        const recievedQuestion = response.body[0].question
        const recievedExplanation = response.body[0].explanation
        const recievedAnswers = response.body[0].answers
        expect(recievedQuestion).toEqual(baseTrivia.question)
        expect(recievedExplanation).toEqual(baseTrivia.explanation)
        expect(recievedAnswers).toEqual(baseTrivia.answers)

        id = response.body[0]._id
    })
    test('should delete the new trivia', async () => {
        const firstResponse = await request(app)
        .delete('/trivia/' + id)
        .expect(200)
        // hasta aqui todo funciona bien
        const secondResponse = await request(app)
        .get('/trivia/')
        .expect('Content-Type', /json/)
        .expect(200)

        expect(secondResponse.body).toEqual([])
    })
})
