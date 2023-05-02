'use strict'

const mongoose = require ('mongoose');

const recommendationSchema = new mongoose.Schema({
  email: String,
  weather: Object,
  clothing: Object,

})

module.exports = mongoose.model('User Recommendations', recommendationSchema)