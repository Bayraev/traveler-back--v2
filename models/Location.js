const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: { type: String, required: true },
  continent: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  map: {
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    zoom: { type: Number, default: 12 },
  },
});

module.exports = mongoose.model('Location', locationSchema);
