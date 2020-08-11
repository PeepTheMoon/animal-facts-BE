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

  //getting ECONNREFUSED- need to add http or https to the url?

  it('gets all animal facts', async() => {
    const facts = prepare(await AnimalFact.find());

    return await request(app)
      .get('/api/v1/facts')
      .then(res => {
        expect(res.body).toEqual(facts);
      });
  });
});
