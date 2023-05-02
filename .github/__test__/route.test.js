'use strict'

const { app } = require('../../server')

const model = require('../../src/database/model/model')

const supertest = require('supertest');

const testApp = supertest(app);

let testObject = {
  email: 'uyvyvv@gmail.com',
  weather: { temp: 60 },
  clothing: { shirt: 'short sleeve' }
}

let request = {
  body: testObject
}

describe('testing database routes', () => {

  test('can post to database', async () => {
    let response = await testApp.post('/recomendation').send(request.body)
    console.log(response.body)
    expect(response.body.email).toBe('uyvyvv@gmail.com')
  }); 

 });