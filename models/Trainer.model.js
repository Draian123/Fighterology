const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const trainerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      enum: ['boxing', 'muay thai', 'jiu jitsu', 'wrestling', 'strength']
    },
    fighter : {
        type: [Schema.Types.ObjectId],
        ref: 'Fighter'
    },
    stats: {
        boxing: Number,
        thai: Number,
        jitsu: Number,
        wrestling: Number,
        strength: Number
    }
  }
);

const Trainer = model("Trainer", trainerSchema);

module.exports = Trainer;
