'use strict';
const axios = require('axios');


class Weather {
  constructor(apiForcast) {
    this.humidity = apiForcast.rh;
    this.temp = apiForcast.temp;
    this.windspeed = apiForcast.wind_spd
  }
}

//can city be used to request data from weatherbit api instead of lat lon?
async function weatherAPI (request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.API_KEY}&lat=${lat}&lon=${lon}&units=I&days=7`;
    let apiForcast = await axios(url);
    let apiWeather = apiForcast.data.data.map(temp => new Weather (temp));
    response.send(apiWeather);
  } catch (error) {
    next(error);
  }
}



module.exports = weatherAPI;
