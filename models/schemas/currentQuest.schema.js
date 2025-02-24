const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currentQuestSchema = new Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  coupon: { type: String },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    zoom: { type: Number, required: true },
  },
});

module.exports = currentQuestSchema;
