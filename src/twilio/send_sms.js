require('dotenv').config();

// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
const accountSid = 'AC5ff50fe209968619d89ff0c206f5eb8b';

// const authToken = process.env.TWILIO_AUTH_TOKEN;
const authToken = 'c97c8077a444b0044ec89713263f0e3d';

const client = require('twilio')(accountSid, authToken);

const RPI_MEASURED_TEMPERATURE = 65;
const WEATHERBIT_API_CONDITIONS = 'sunny';

client.messages
  .create({
     body: `It's ${RPI_MEASURED_TEMPERATURE} degrees and ${WEATHERBIT_API_CONDITIONS} outside, clueless-caterpillar recommends wearing a light jacket and button-up shirt.`,
     from: '+12062087730',
     to: '+12064091159'
   })
  .then(message => console.log(message.sid));