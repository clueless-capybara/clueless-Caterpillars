'use strict';

require('dotenv').config()
const getWeeklyWeather = require('./getWeather.js');

function getCityInput() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Input city: ', async city => {
    let result = await getWeeklyWeather(city)
    console.log('NEXT WEEK WEATHER ', result);
    readline.close();
    return result;
  });
}

module.exports = getCityInput;
// getCityInput()
