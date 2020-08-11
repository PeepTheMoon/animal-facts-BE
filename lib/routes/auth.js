const { Router } = require('express');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User 
      .create(req.body)
      .then(user => res.send(user));

  });
