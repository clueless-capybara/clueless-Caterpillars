'use strict';

const tempClothes = require('./clothes-recommendation/temp-clothes');
const eventClothes = require('./clothes-recommendation/event-clothes')

function getClothesByTemp (temperature){
  let recommendation;

  for (let temp=30; temp < 91; temp +=10) {
    if (temperature-temp < 0){
      console.log(tempClothes[temp-10])
      return tempClothes[temp-10];
    }
  }
}


// this function is broken and it sends undefined event clothes to the text message body
function getClothesByEvent (event) {
  let eventList = Object.keys(eventClothes);
  if (eventList.includes(event.toLowerCase())){
    console.log('getClothesByEvent returns ' + eventClothes[event]);
    return eventClothes[event];
  }
}

module.exports = {
  getClothesByTemp,
  getClothesByEvent,
}
