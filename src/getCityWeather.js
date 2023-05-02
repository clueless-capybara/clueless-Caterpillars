require('dotenv').config()
const getWeeklyWeather = require('./getWeather.js');

function getCityWeather() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Input city: ', async city => {
    let result = await getWeeklyWeather(city)
    console.log(result)
    readline.close();
  });
}

module.exports = getCityWeather;




