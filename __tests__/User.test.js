require('dotenv').config();
const User = require('../lib/models/User'); 

describe('user routes', () => {
  it('sets a password hash', () => {

    const user = new User({
      username: 'testName', 
      password: 'password',
      profileImage: 'my-pic.jpg'
    });

    expect(user.passwordHash).toEqual(expect.any(String));
  });
});
