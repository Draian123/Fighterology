

  // ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const Product = require("../models/Product.model");
const ShoppingList = require('../models/ShoppingList.model')
const starterShoppingList =[ {
  name: "groceries",
}, {
  name: "holydays"
},
  {
    name: "cosmetics"
  }
]


const starterProducts = [
{
  name: "Milk"
},
{
  name: "Chicken"
},
{
  name: "Water"
},
{
  name: "Rice"
},
{
  name: "Bread"
},
{
  name: "Potatoes"
},
{
  name: "Onions"
},
{
  name: "Pasta"
}

]

// // ℹ️ Sets the MongoDB URI for our app to have access to it.
// // If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/fighterology";

mongoose
  .connect(MONGO_URI)
  .then(async (x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
    await ShoppingList.collection.drop()
    await ShoppingList.create(starterShoppingList)
    await Product.collection.drop()
    await Product.create(starterProducts)
    // mongoose.connection.close()
  })
  .then(() => mongoose.connection.close())
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

