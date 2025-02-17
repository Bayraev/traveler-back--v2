const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: '/default-avatar.png' },
    completedQuests: [
      {
        questId: { type: Schema.Types.ObjectId, ref: 'Quest' },
        completionDate: { type: Date, default: Date.now },
        photoUrl: String,
      },
    ],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
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
