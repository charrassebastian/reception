const request = require('supertest')
const { app } = require('../server');
const { store } = require('../services/spot-service')
const { connect, getUri, closeDb } = require('../db')

const baseSpot = { name: '1', available: false }

beforeAll(async () => {
    const uri = await getUri()
    await connect({ uri })
})

afterAll(async () => {
    await closeDb()
})

describe('POST /spots', () => {
    let id = null
    test('should store a new spot', async () => {
        const response = await request(app)
        .post('/spots')
        .send(baseSpot)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)

        const { _id, ...spotStored } = response.body

        expect(spotStored).toEqual(baseSpot)
        expect(_id).toBeTruthy()
    })
    test('should get the new spot', async () => {
        const response = await request(app)
        .get('/spots/')
        .expect('Content-Type', /json/)
        .expect(201)

        expect(response.body).toHaveLength(1)
        const recievedName = response.body[0].name
        const recievedAvailable = response.body[0].available
        expect(recievedAvailable).toEqual(baseSpot.available)
        expect(recievedName).toEqual(baseSpot.name)

        id = response.body._id
    })
    test('should delete the new spot', async () => {
        const firstResponse = await request(app)
        .delete('/spots/' + id)
        .expect('Content-Type', /json/)
        .expect(201)

        const secondResponse = await request(app)
        .get('/spots/')
        .expect('Content-Type', /json/)
        .expect(201)
        
        expect(secondResponse.body).toBeNull()
    })
})
