require('dotenv').config();

const getWeatherAndEvents = require('./../getWeatherAndEvents')

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

function sendSMS(text)   {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  console.log(accountSid);
  
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  console.log(authToken);
  
  const client = require('twilio')(accountSid, authToken);

  client.messages
  .create({
    body: text,
    from: `+${process.env.TWILIO_PHONE_NUMBER}`,
    to: `+${process.env.RECIPIENT_PHONE_NUMBER}`
  })
  .then(message => console.log(message.sid));
}

module.exports = sendSMS;

// let testMessage = async() => {
//   let text = await getWeatherAndEvents();
//   return sendSMS(text);
// }

// testMessage()
