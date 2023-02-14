const express = require('express');
const Product = require('../models/Product.model');
const ShoppingList = require('../models/ShoppingList.model');
const User = require('../models/User.model');
const { isLoggedOut, isLoggedIn } = require('../middleware/route-guard');
const router = express.Router();


/* GET home page */
router.get("/", (req, res, next) => {
  
  res.render("index");
});

router.post("/addProduct/:id",isLoggedIn, async (req, res, next) => {
  const body = req.body
  const id = req.params.id
  var user = req.session.user

  let currentList = await ShoppingList.findById(id)
  let createdProduct = await Product.create({name: body.name})

  currentList.need.push(createdProduct._id)
  currentList.save()
  let currentListUpadted = await ShoppingList.findById(id).populate('need')
  const allShoppingListsOfUser = await ShoppingList.find({userId: user._id})
  .populate('need')

  req.session.user.shoppingLists = allShoppingListsOfUser
  const findUser = await User.findById(req.session.user._id)
  findUser.shoppingLists = allShoppingListsOfUser
  findUser.save()
  req.session.user = findUser
  res.redirect(`/auth/profile/list/${id}`)
});


router.post("/moveNeedToHave/:id",isLoggedIn, async (req, res, next) => {
  const body = req.body
  const id = req.params.id
  var user = req.session.user

  let currentList = await ShoppingList.findById(id)
  let currentProduct = await Product.findById(body.id)
  currentList.have.push(currentProduct)
  currentList.save()
  let currentList2 = await ShoppingList.findById(id).populate('need')

  const findcorrectObjs = (element) => !element._id.equals(currentProduct._id)

  let index = currentList2.need.filter(findcorrectObjs)
  let updatedShoppingList = await ShoppingList.findByIdAndUpdate(id,{need: index})
  res.redirect(`/auth/profile/list/${id}`)
});

router.post("/moveHaveToNeed/:id", isLoggedIn, async (req, res, next) => {
  const body = req.body
  const id = req.params.id
  var user = req.session.user
  let currentList = await ShoppingList.findById(id)
  let currentProduct = await Product.findById(body.id)
  currentList.need.push(currentProduct)
  currentList.save()
  let currentList2 = await ShoppingList.findById(id).populate('have')

  const findcorrectObjs = (element) => !element._id.equals(currentProduct._id)

  let index = currentList2.have.filter(findcorrectObjs)
  console.log("index:::",index)
  let updatedShoppingList = await ShoppingList.findByIdAndUpdate(id,{have: index})

  res.redirect(`/auth/profile/list/${id}`)
});

//delete product
router.post("/delete/product/:listId", isLoggedIn, async (req, res, next) => {
  const body = req.body
  const id = req.params.listId
  let currentList = await ShoppingList.findById(id)
  let currentProduct = await Product.findById(body.id)

  const findcorrectObjs = (element) => !element._id.equals(currentProduct._id)

  let index = currentList.have.filter(findcorrectObjs)
  let updatedShoppingList = await ShoppingList.findByIdAndUpdate(id,{have: index})
  let deletedProduct = await Product.findByIdAndDelete(body.id)
  res.redirect(`/auth/profile/list/${id}`)
});

module.exports = router;
