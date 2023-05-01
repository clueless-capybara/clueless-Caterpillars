'use strict';

const dynamoose = require('dynamoose');

const params = {
  TableName: 'TemperatureClothing',
  KeySchema: [
    { AttributeName: 'temperature', KeyType: 'HASH' },
    { AttributeName: 'clothing', KeyType: 'RANGE' },
  ],
  AttributeDefinitions: [
    { AttributeName: 'temperature', AttributeType: 'N' },
    { AttributeName: 'clothing', AttributeType: 'S' },
  ],
  BillingMode: 'PAY_PER_REQUEST',
};

dynamoose.create(params, (err, data) => {
  if (err) {
    console.error('Error creating table:', err);
  } else {
    console.log('Table created successfully:', data);
  }
});
