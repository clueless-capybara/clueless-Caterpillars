'use strict'

require('dotenv').config();
const handleError = require('./src/errorhandlers/500');
const handleNotFound = require('./src/errorhandlers/400');
const weatherAPI = require('./src/middleware/weatherapi')
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
  res.send('Server Live');
});

app.use('*', handleNotFound);
app.use(handleError);
app.get('/weather', weatherAPI);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log(`Server up on port ${port}`));
  },
};
