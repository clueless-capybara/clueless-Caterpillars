'use strict';

const getCityForecast = require('./getCityForecast');
const { getCalendarEvents } = require('./calendar/index');

const getClothes = require('./getClothes');

async function getWeatherAndEvents(){
  
  
  return async (forecastObject) => {
    
    await getCityForecast();

    let forecastedDates = [];
    forecastObject.map( item => {
      forecastedDates.push(item['date']);
    });
    console.log('FORECAST: ', forecastObject);

    
    let eventsObject = getCalendarEvents
    let eventDates = Object.keys(eventsObject);
    
    for (let item of eventDates){
      
      // if the dates of the events matches one of the dates being forecasted
      // get the forecast of the day
      if (forecastedDates.includes(date)){
        let index = forecastedDates.indexOf(item);
        let weatherOfEvent = forecastObject[index];
        console.log(weatherOfEvent);
        
        //get high-temp and low-temp cloth recommendation:
        let clothesForHighTemp = getClothes.getClothesByTemp(weatherOfEvent['feelsLikeMax']);
        let clothesForLowTemp = getClothes.getClothesByTemp(weatherOfEvent['feelsLikeMin']);
        let clothesForEvent = getClothes.getClothesByEvent(eventsObject[date]);
        
        console.log(`Event of the day: ${eventsObject[date]},
        Weather of the day: ${weatherOfEvent},
        What to wear for the event: ${clothesForEvent},
        What to wear for the high of the day: ${clothesForHighTemp},
        What to wear for the low of the day: ${clothesForLowTemp},
        `);
      }
    };
  }


}

module.exports = getWeatherAndEvents;

// getWeatherAndEvents()