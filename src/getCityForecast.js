require('dotenv').config()
const getWeeklyWeather = require('./getWeather.js');

function getCityForecast() {
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

module.exports = getCityForecast;
// getCityForecast();




