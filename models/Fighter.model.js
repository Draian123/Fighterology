const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const fighterSchema = new Schema(
  {
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
    fights: {
      wins: Number,
      losses: Number
    },
    trainer : {
        type: [Schema.Types.ObjectId],
        ref: 'Trainer'
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

const Fighter = model("Fighter", fighterSchema);

module.exports = Fighter;
