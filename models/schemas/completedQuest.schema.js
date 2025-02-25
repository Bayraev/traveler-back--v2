const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const completedQuestSchema = new Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  coupon: { type: String },
  completionDate: { type: Date, default: Date.now },
  images: [{ type: String }],
  comment: { type: String, required: true },
});

module.exports = completedQuestSchema;
