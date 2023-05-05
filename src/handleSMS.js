'use strict';

const sendSMS = require('./sms/sms_sends');
const {sendEmail} = require('./email/sendEmail')
const getWeatherAndEvents = require('./getWeatherAndEvents');
const getClothesNow = require('./getClothesNow');
const dbModel = require('./database/model');

const handleSMS = async () => {

    let text = await getWeatherAndEvents();
    let msg = '';
    if (Array.isArray(text)){
      text.forEach(item => {return msg = msg +'\n' + item});
      // console.log('SMS handled', msg);
      // return result;    // for testing, save money for text-messages

      sendSMS(msg, process.env.TWILIO_PHONE_NUMBER, process.env.RECIPIENT_PHONE_NUMBER, process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      sendEmail(msg);
    }
  
    if (msg){
      dbModel.create(
        {
          email: process.env.TEST_EMAIL,
          message: msg,
        }
      )
    }
    else {
      dbModel.create({
        email: process.env.TEST_EMAIL,
        message: 'It\s room temperature, under standard pressure, wear a light jacket'
      })
    }
}

const sendCurrentWeatherSMS = async () => {

  let msg = '';
  let clothesNow = await getClothesNow();
  // let currentTemp = (+weatherNow['temperature']*1.8+32).toFixed();
  // let currentHumidity = (+weatherNow['humidity']).toFixed();
  let currentClothes = clothesNow['currentClothes'];
  // console.log(clothesNow)
  msg = `Clueless Caterpillar \u00A9 sez look out your window and smile! 
  According to our reading at ${clothesNow['timeStamp']}, the current temperature is ${clothesNow['currentTemp']}F, with ${clothesNow['currentHumidity']}% humidity. We recommend ${currentClothes[0]}, ${currentClothes[1]}, or ${currentClothes[2]}.`
    // console.log('SMS handled', msg);
    // return msg;    // for testing, save money for text-messages
    sendSMS(msg, process.env.TWILIO_PHONE_NUMBER, process.env.RECIPIENT_PHONE_NUMBER, process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    sendEmail(msg);
}

module.exports = { handleSMS, sendCurrentWeatherSMS };
