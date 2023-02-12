const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const shoppingListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    userId:{
      type: String,
      required: true
    },
    need: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    have: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
  }],
  }
);


const ShoppingList = model("ShoppingList", shoppingListSchema);

module.exports = ShoppingList;;
