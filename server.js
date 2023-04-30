'use strict'

require('dotenv').config();
const handleError = require('./errorhandlers/500');
const handleNotFound = require('./errorhandlers/404');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('Server Live');
});

app.use('*', handleNotFound);
app.use(handleError);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log(`Server up on port ${port}`));
  },
};
