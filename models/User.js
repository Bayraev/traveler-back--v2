const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const currentQuestSchema = require('./schemas/currentQuest.schema');
const completedQuestSchema = require('./schemas/completedQuest.schema');

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '/default-avatar.png' },
    currentQuest: currentQuestSchema,
    completedQuests: [completedQuestSchema],
    friends: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        username: { type: String, required: true },
        avatar: { type: String },
        addedAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual('friendsCount').get(function () {
  return this.friends.length;
});

module.exports = mongoose.model('User', userSchema);
