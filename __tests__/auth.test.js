require('dotenv').config();
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const mongoose = require('mongoose');
const connect = require('../lib/utils/connect');
const request = require('supertest');
const app = require('../lib/app');
const User = require('../lib/models/User');

describe('auth routes', () => {
  beforeAll(async() => {
    const uri = await mongod.getUri();
    return connect(uri);
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(async() => {
    await mongoose.connection.close();
    return mongod.stop();
  });

  it('signs up a new user with username, profileImage, and password', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'username1',
        profileImage: 'image.png',
        password: 'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'username1',
          profileImage: 'image.png', 
        });
      });
  });

  it('logs in a user with correct username and password', async() => {
    await User.create({
      username: 'username1',
      profileImage: 'image.png',
      password: 'password'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({
        username: 'username1',
        password: 'password'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'username1',
          profileImage: 'image.png',
        });
      });
  });

  it('verifies a signed up user', () => {
    const agent = request.agent(app);
    return agent
      .post('/api/v1/auth/signup')
      .send({ 
        username: 'username1', 
        password: 'password' })
      .then(() => agent.get('/api/v1/auth/verify'))
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'username1'
        });
      });
  });
});
