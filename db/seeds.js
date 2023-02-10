const trainers = [
    {
      name: "Istvan",
      expertise: "boxing",
      bonus: 3
    },
    {
      name: "Top G Thai",
      expertise: "muay thai",
      bonus: 2
    },
    {
      name: "Harald",
      expertise: "jiu jitsu",
      bonus: 4
    },
    {
      name: "Josh",
      expertise: "wrestling",
      bonus: 3
    },
    {
      name: "Odin",
      expertise: "strength",
      bonus: 6
    }
  ]

  // ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const Trainer = require("../models/Trainer.model");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fighterology";

mongoose
  .connect(MONGO_URI)
  .then(async (x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
    await Trainer.collection.drop()
    await Trainer.create(trainers)
    // mongoose.connection.close()
  })
  .then(() => mongoose.connection.close())
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
