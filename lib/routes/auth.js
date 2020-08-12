const { Router } = require('express');
const User = require('../models/User');
// const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/signup', (req, res, next) => {
    User 
      .create(req.body)
      .then(user => res.send(user))
      .catch(next);
  });
