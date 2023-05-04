'use strict'

const mongoose = require ('mongoose');

const recommendationSchema = new mongoose.Schema({
  email: String,
  message: String,
});




module.exports = mongoose.model('User Recommendations', recommendationSchema)