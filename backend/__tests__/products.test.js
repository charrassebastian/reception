const request = require('supertest')
const { app } = require('../server');
const { store } = require('../services/spot-service')

jest.mock('../services/spot-service.js')

const baseSpot = { name: '1', available: false }

beforeEach(() => {
    store.mockReset()
})

describe('POST /spots', () => {
    test('should store a new product', async () => {
        const response = await request(app)
          .post('/spots')
          .send(baseSpot)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
      
        expect(response.body).toEqual({
          ...baseSpot,
          _id: '1',
        })
      })
    test('should execute the store function', async () => {
        await request(app)
        .post('/spots')
        .send(baseSpot)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        
        expect(store).toHaveBeenCalledWith(baseSpot)
    })
})
