const request = require('supertest')
const { app } = require('../server');

describe('POST /spots', () => {
    test('should store a new product', async () => {
        const response = await request(app)
          .post('/spots')
          .send({
            name: '1',
            available: false,
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
      
        expect(response.body).toEqual({
          name: '1',
          available: false,
          _id: '1',
        })
      })

})
