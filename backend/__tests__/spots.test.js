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
        .expect(200)

        expect(response.body).toHaveLength(1)
        const recievedName = response.body[0].name
        const recievedAvailable = response.body[0].available
        expect(recievedAvailable).toEqual(baseSpot.available)
        expect(recievedName).toEqual(baseSpot.name)

        id = response.body[0]._id
    })
    test('should update the spot', async () => {
        const updatedSpot = {
            name: 'uno',
            available: true
        }

        const firstResponse = await request(app)
        .put('/spots/' + id)
        .send(updatedSpot)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)

        const secondResponse = await request(app)
        .get('/spots')
        .expect('Content-Type', /json/)
        .expect(200)

        expect(secondResponse.body).toHaveLength(1)
        expect(secondResponse.body[0].name).toEqual(updatedSpot.name)
        expect(secondResponse.body[0].available).toEqual(updatedSpot.available)
    })
    test('should delete the new spot', async () => {
        const firstResponse = await request(app)
        .delete('/spots/' + id)
        .expect(200)

        const secondResponse = await request(app)
        .get('/spots/')
        .expect('Content-Type', /json/)
        .expect(200)
        
        expect(secondResponse.body).toEqual([])
    })
})
