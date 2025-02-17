const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currentQuestSchema = new Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  coupon: { type: String },
});

module.exports = currentQuestSchema;
