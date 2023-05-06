'use strict';

require('dotenv').config()
const getWeeklyWeather = require('./getWeather.js');

function getCityUserInput() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Input city: ', async input => {
    readline.close();
    return input;
  });
}

module.exports = getUserCityInput;
