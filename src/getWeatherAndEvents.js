'use strict';

const getCityForecast = require('./getCityForecast');
const getWeather = require('./getWeather');
const { getCalendarEvents } = require('./calendar/index');

const getClothes = require('./getClothes');

async function getWeatherAndEvents(){
  let recommendation;
  try{
    let forecastObject = await getWeather();

    let forecastedDates = [];
    forecastObject.map( item => {
      forecastedDates.push(item['date']);
    });
    // console.log('FORECAST: ', forecastObject);


    const eventObject = async () => {
      let result = await getCalendarEvents;
      return result;
    } 
    let eventsObject = await eventObject();
    let eventDates = Object.keys(eventsObject);
    
    for (let date of eventDates){
      // if the dates of the events matches one of the dates being forecasted
      // get the forecast of the day
      if (forecastedDates.includes(date)){
        let index = forecastedDates.indexOf(date);
        let weatherOfEvent = forecastObject[index];
        // console.log(weatherOfEvent);
        
        //get high-temp and low-temp cloth recommendation:
        let clothesForHighTemp = getClothes.getClothesByTemp(weatherOfEvent['feelsLikeMax']);
        let clothesForLowTemp = getClothes.getClothesByTemp(weatherOfEvent['feelsLikeMin']);
        let clothesForEvent = getClothes.getClothesByEvent(eventsObject[date]);

        recommendation = `Event of the day: ${eventsObject[date]},
        Weather of the day is between ${weatherOfEvent['minTemperature']} and ${weatherOfEvent['maxTemperature']},
        What to wear for the event: ${clothesForEvent},
        What to wear for the high of the day: ${clothesForHighTemp},
        What to wear for the low of the day: ${clothesForLowTemp}`
      }
    } 

  } catch(e) {
    console.log('getWeatherAndEvents error report', e)
  }
    
    // console.log(recommendation);
    return recommendation || 'clueless caterpillar (c) sez look out your window, dumbass'
  }

module.exports = getWeatherAndEvents;
