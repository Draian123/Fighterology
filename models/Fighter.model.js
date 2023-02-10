const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const fighterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },

  wins: { type: Number },
  losses: { type: Number },

  trainers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Trainer',
    },
  ],
  boxing: { type: Number },
  'muay thai': { type: Number },
  'jiu jitsu': { type: Number },
  wrestling: { type: Number },
  strength: { type: Number },
});

const Fighter = model('Fighter', fighterSchema);

module.exports = Fighter;
