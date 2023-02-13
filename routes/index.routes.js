const express = require('express');
const Product = require('../models/Product.model');
const ShoppingList = require('../models/ShoppingList.model');
const User = require('../models/User.model');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  
  res.render("index");
});

router.post("/addProduct/:id", async (req, res, next) => {
  const body = req.body
  const id = req.params.id
  var user = req.session.user
  // console.log(user)
  // console.log(body.name)
  // console.log(id)
  let currentList = await ShoppingList.findById(id)
  let createdProduct = await Product.create({name: body.name})
  // console.log(createdProduct)
  currentList.need.push(createdProduct._id)
  currentList.save()
  // console.log(currentList)
  let currentListUpadted = await ShoppingList.findById(id).populate('need')
  // console.log('currentListUpdated:' , currentListUpadted)
  const allShoppingListsOfUser = await ShoppingList.find({userId: user._id})
  .populate('need')
  req.session.user.shoppingLists = allShoppingListsOfUser
  // allShoppingListsOfUser.forEach(e=> console.log("needs:", e.need))
  // console.log(req.session.user)
  const findUser = await User.findById(req.session.user._id)
  findUser.shoppingLists = allShoppingListsOfUser
  findUser.save()
  req.session.user = findUser
  res.redirect(`/auth/profile/list/${id}`)
});


// /moveNeedToHave
router.post("/moveNeedToHave/:id", async (req, res, next) => {
  const body = req.body
  const id = req.params.id
  var user = req.session.user
  // console.log(user
  console.log(body)
  console.log(id)
  let currentList = await ShoppingList.findById(id)
  let currentProduct = await Product.findById(body.id)
  console.log(currentList)
  console.log("CurentProdcut::",currentProduct)
  currentList.have.push(currentProduct)
  currentList.save()
  let currentList2 = await ShoppingList.findById(id).populate('need')

  

  const findcorrectObj = (element) => !element._id.equals(currentProduct._id)
  // new String(element._id) !== new String(currentProduct._id)


  let index = currentList2.need.filter(findcorrectObj)
  console.log("index:::",index)
  let updatedShoppingList = await ShoppingList.findByIdAndUpdate(id,{need: index})
  // console.log("currentListUpdated::", currentList)

  // currentList.need.push(createdProduct._id)
  // currentList.save()
  // console.log(currentList)
  // let currentListUpadted = await ShoppingList.findById(id).populate('need')
  // console.log('currentListUpdated:' , currentListUpadted)
  // const allShoppingListsOfUser = await ShoppingList.find({userId: user._id})
  // .populate('need')
  // req.session.user.shoppingLists = allShoppingListsOfUser
  // allShoppingListsOfUser.forEach(e=> console.log("needs:", e.need))
  // console.log(req.session.user)
  // const findUser = await User.findById(req.session.user._id)
  // findUser.shoppingLists = allShoppingListsOfUser
  // findUser.save()
  // req.session.user = findUser
  res.redirect(`/auth/profile/list/${id}`)
});
module.exports = router;
