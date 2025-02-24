const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema = new Schema({
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  coupon: { type: String },
});

const citySchema = new Schema({
  city: { type: String, required: true },
  coordinates: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    zoom: { type: Number, default: 12 },
  },
  quests: [questSchema],
});

const worldSchema = new Schema(
  {
    country: { type: String, required: true },
    cities: [citySchema],
  },
  { collection: 'world' },
);

module.exports = mongoose.model('World', worldSchema);
