'use strict'

require('dotenv').config();
const handleError = require('./errorhandlers/500');
const handleNotFound = require('./errorhandlers/400');

const getCityForecast = require('./getCityForecast');
const getWeatherAndEvents = require('./getWeatherAndEvents');
const Data = require('./models/mongoweather')

const express = require('express');
const cors = require('cors');
// const prompt = require('prompt-sync')();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res, next) => {
  res.send('Server Live');
});


getWeatherAndEvents()

// setTimeout(() => {
//   getWeatherAndEvents();
// }, "1 second");

app.post(Data.addWeather);
app.delete(Data.deleteWeather);
app.put(Data.updateWeather);

// setTimeout(() => {
//  getCity();
// }, "1 second");


app.use('*', handleNotFound);
app.use(handleError);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log(`Server up on port ${port}`));
  },
};
