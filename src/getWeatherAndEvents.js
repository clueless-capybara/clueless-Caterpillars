'use strict';

// const getCityForecast = require('./getCityForecast');
const getWeatherNow = require('./getWeatherNow')
const getWeather = require('./getWeather');
const getClothesNow = require('./getClothesNow');
const { getCalendarEvents } = require('./calendar/index');
const eventsClothes = require('./clothes-recommendation/event-clothes')
const getClothes = require('./getClothes');
const eventClothes = require('./clothes-recommendation/event-clothes');

async function getWeatherAndEvents(){
  let recommendation = [];
  let message;
  let forecastObject = await getWeather();
  
  const eventObject = async () => {
    let result = await getCalendarEvents;
    return result
  } 

  // let eventsObject = [ { '2023-05-05': 'interview' }, { '2023-05-06': 'dates' } ]
  let eventsObject = await eventObject();
  let eventDates = eventsObject.map(event => Object.keys(event)).flat();
  console.log('Event Dates, ', eventDates)

  if (Array.isArray(forecastObject)){
  try{
    let forecastedDates = [];
    forecastObject.map( item => {
      forecastedDates.push(item['date']);
    });
    // console.log('FORECAST: ', forecastObject);

    for (let date in eventDates){
      // if the dates of the events matches one of the dates being forecasted
      // get the forecast of the day
      let eventOfTheDay = Object.values(eventsObject[date]);
      let eventClothesRecommendations = Object.keys(eventClothes);

      if (forecastedDates.includes(eventDates[date]) && eventClothesRecommendations.includes(eventOfTheDay[0])){
        let index = forecastedDates.indexOf(eventDates[date]);
        let weatherOfEvent = forecastObject[index];
        // console.log(weatherOfEvent);
        
        //get high-temp and low-temp cloth recommendation:
        let clothesForHighTemp = getClothes.getClothesByTemp(weatherOfEvent['feelsLikeMax']);
        let clothesForLowTemp = getClothes.getClothesByTemp(weatherOfEvent['feelsLikeMin']);

        // let eventIndex = eventDates.indexOf(date);
        let clothesForEvent = getClothes.getClothesByEvent(eventOfTheDay[0]);

        message = `Event of the day: ${eventOfTheDay},
        Weather of the day is between ${weatherOfEvent['minTemperature']} and ${weatherOfEvent['maxTemperature']},
        What to wear for the event: ${clothesForEvent},
        What to wear for the high of the day: ${clothesForHighTemp},
        What to wear for the low of the day: ${clothesForLowTemp}`
        // console.log(message);
        recommendation.push(message);
      }
    } 

  }catch(e){
    console.log(e);
  }
}

  else{
    let clothesNow = await getClothesNow();
    // let currentTemp = (+weatherNow['temperature']*1.8+32).toFixed();
    // let currentHumidity = (+weatherNow['humidity']).toFixed();
    let currentClothes = clothesNow['currentClothes'];
    recommendation = `Clueless Caterpillar\u00A9 sez look out your window, dumbass! 
    According to our reading at ${clothesNow['timeStamp']}, the current temperature is ${clothesNow['currentTemp']}F, with ${clothesNow['currentHumidity']}% humidity. We recommend ${currentClothes[0]}, ${currentClothes[1]}, and ${currentClothes[2]}.`
    // recommendation.push(message)
  }
    
    console.log(recommendation);
    return recommendation ||  'clueless caterpillar (c) sez look out your window, dumbass'
  }

module.exports = getWeatherAndEvents;
// getWeatherAndEvents()

