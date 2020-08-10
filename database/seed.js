const chance = require('chance').Chance();

const User = require('../lib/models/User');
const AnimalFact = require('../lib/models/AnimalFact');

module.exports = async({ users = 10, animalFacts = 20 } = {}) => {
  
  const createdUsers = 
  await User.create([...Array(users)].map((_, i) => ({
    username: `exampleName${i}`,
    password: 'password',
    profileImage: chance.url()
  })));
 
  await AnimalFact.create([...Array(animalFacts)].map(() => ({
    user: chance.pickone(createdUsers)._id,
    image: chance.url(),
    caption: chance.sentence()
  })));
};
