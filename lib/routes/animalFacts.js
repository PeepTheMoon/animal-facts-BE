const { Router } = require('express');
const AnimalFact = require('../models/AnimalFact');

module.exports = Router()
  .post('/', (req, res, next) => {
    AnimalFact
      .create(req.body)
      .then(fact => res.send(fact))
      .catch(next);
  });
