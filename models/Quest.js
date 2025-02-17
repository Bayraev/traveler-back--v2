const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema = new Schema({
  locationId: { type: Schema.Types.ObjectId, ref: 'Location', required: true },
  description: { type: String, required: true },
  photoUrl: { type: String, required: true },
  coupon: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^[A-Z]{3}\_[A-Z0-9]{4}$/.test(v),
      message: 'Invalid coupon format. Must be XXX_YYYY format',
    },
  },
});

module.exports = mongoose.model('Quest', questSchema);
