const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shoppingLists: [{
    type: Schema.Types.ObjectId,
    ref: 'ShoppingList'
}]
});

const User = model('User', UserSchema);

module.exports = User;
