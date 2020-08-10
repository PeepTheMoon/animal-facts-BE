require('dotenv').config();
const app = require('../lib/app');
const request = require('supertest');
// const User = require('../lib/models/User'); 
const { prepare } = require('../database/data-helpers');
const AnimalFact = require ('../lib/models/AnimalFact.js');

describe('routes for AnimalFact model', () => {
  it('creates an animalFact', async() => {
    return await request(app)
      .post('/api/v1/facts')
      .send({
        image: 'myimage.png',
        caption: 'this animal is crazy'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.anything(),
          image: 'myimage.png',
          caption: 'this animal is crazy'
        });
      });
  });
});
