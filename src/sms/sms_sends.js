require('dotenv').config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

const accountSid = process.env.TWILIO_ACCOUNT_SID;

console.log(accountSid);

const authToken = process.env.TWILIO_AUTH_TOKEN;

console.log(authToken);

const client = require('twilio')(accountSid, authToken);

const RPI_MEASURED_TEMPERATURE = 65;
const WEATHERBIT_API_CONDITIONS = 'sunny';

client.messages
  .create({
     body: `It's ${RPI_MEASURED_TEMPERATURE} degrees and ${WEATHERBIT_API_CONDITIONS} outside, clueless-caterpillar recommends wearing a light jacket and button-up shirt.`,
     from: `+${process.env.TWILIO_PHONE_NUMBER}`,
     to: `+${process.env.NATES_PHONE_NUMBER}`
   })
  .then(message => console.log(message.sid));