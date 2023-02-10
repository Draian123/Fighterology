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
    fighters : [{
        type: Schema.Types.ObjectId,
        ref: 'Fighter'
    }],
    stats: {
      type: Number,
      required: true
    }
  }
);

const Trainer = model("Trainer", trainerSchema);

module.exports = Trainer;
