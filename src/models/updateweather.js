'use strict';

const dynamoose = require('dynamoose');

const weatherSchema = new dynamoose.Schema({
'min_temp': String,
'max_temp': String,
'humidity': String,
'windSpeed': String,
'feelsLikeMax': String,
'feelsLikeMin': String,
'id': String
});

const weatherModel = dynamoose.model('Weather', weatherSchema);

exports.handler = async (event) => {
console.log("Update Weather Event Object", event);
let id = event.pathParameters.id;
let parsedData = JSON.parse(event.body);
let updatedMinTemp = parsedData.min_temp;
let updatedMaxTemp = parsedData.max_temp;
let updatedHumidity = parsedData.humidity;
let updatedWindSpeed = parsedData.windSpeed;
let responseBody = null;

if (id) {
console.log('REQUEST PATH PARAMS:', id);
responseBody = await weatherModel.update({ 'id': id, "max_temp": updatedMaxTemp, "min_temp": updatedMinTemp,'humidity': updatedHumidity, 'windSpeed': updatedWindSpeed });
};
const response = {
statusCode: 200,
body: JSON.stringify(responseBody)
};
return response;
};
