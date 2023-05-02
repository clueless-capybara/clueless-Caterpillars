'use strict'

require('dotenv').config();
const handleError = require('./src/errorhandlers/500');
const handleNotFound = require('./src/errorhandlers/400');
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const dbModel = require('./src/database/model/model');
const port = 3003

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.database_url);

app.get('/', (req, res, next) => {
  res.send('Server Live');
});

app.post('/recomendation', (req, res, next) => {
  console.log(req.body);
  dbModel.create(req.body)
    .then(data => {
      console.log('successfully added to db')
      res.status(202).send(data)
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.delete('/recomendation', (req, res, next) => {
  console.log('hello');
  dbModel.deleteOne({
    email:'inuwndnw@gmail.com'
  })
    // .then(data => {
    //   console.log('data ID ', data);
    //   dbModel.findByIdAndDelete(data._id);
    // })
    .then(data => {
      res.status(205).send(data);
    })
    .catch(error => {
      res.status(500).send(error)
    })
})

app.use('*', handleNotFound);
app.use(handleError);

app.listen(port, () => console.log(`Server up on port ${port}`));


module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log(`Server up on port ${port}`));
  },
};
