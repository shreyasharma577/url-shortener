const mongoose = require('mongoose');

// Define the blueprint for our URLs
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true
  }
});

// Export the model so we can use it in server.js
module.exports = mongoose.model('Url', urlSchema);