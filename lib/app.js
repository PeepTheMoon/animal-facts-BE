const express = require('express');
const app = express();

app.use(require('cors')({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/facts', require('./routes/animalFacts'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
