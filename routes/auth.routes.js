const express = require('express');
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model');
const Product = require('../models/Product.model')
const ShoppingList = require('../models/ShoppingList.model')
const bcrypt = require('bcrypt');

/* GET home page */
router.get("/",isLoggedOut, async (req, res, next) => {
  res.render("signUp");


});

router.post("/", async(req, res, next) => {
  try {
    let body = req.body;
    const salt = bcrypt.genSaltSync(12)
    let passwordHash = bcrypt.hashSync(body.password, salt)
    body.password = passwordHash
    var createdUser = await User.create(body)
    let newShoppingList = await ShoppingList.create({
      name: "groceries",
      userId: createdUser._id
    })
    res.redirect('/auth/login')
    
}catch(err) {
    console.error(err)
}
})

router.get("/login", isLoggedOut, (req, res, next) => {
  res.render("login");
});

router.post('/login', isLoggedOut, async(req, res) => {
  const body = req.body
  try{
      let userFound = await User.find({name: body.name})

  if(userFound == null){
      throw new Error('User not found')
  }else{
      if(bcrypt.compareSync(body.password, userFound[0].password)){
          let allShoppingListsofUser = await ShoppingList.find({userId: userFound[0]._id})
          userFound[0].shoppingLists = allShoppingListsofUser
          req.session.user = userFound[0]
          res.redirect('/auth/profile')
      } else {
          // res.render('signIn', {errorMessage: 'wrong password', body})
          throw new Error('Invalid password')
      }
  }
  }catch(err) {
          res.render('login', {body, err: err})
  }
});


router.get("/profile",isLoggedIn, (req, res, next) => {
  res.render("profile", {allShoppingLists: req.session.user.shoppingLists});
});

router.post("/profile/delete/:id", async (req, res, next) => {
  const listId = req.params.id
  await ShoppingList.findByIdAndDelete(listId)
  let allShoppingLists = await ShoppingList.find({userId: req.session.user._id})
  req.session.user.shoppingLists = allShoppingLists
  res.redirect("/auth/profile");
});

router.get("/profile/:id", isLoggedIn , (req, res, next) => {
  res.render("profile", {allShoppingLists: req.session.user.shoppingLists})
});



router.post("/profile/createNewList", isLoggedIn , async (req, res, next) => {
  const newList = req.body.newList
  var user = req.session.user
  await ShoppingList.create({name: newList, userId: user._id})

  let userShoppingLists = await ShoppingList.find({userId: user._id})
  req.session.user.shoppingLists = userShoppingLists
  res.redirect("/auth/profile");
});
//get adds a ? to get routes with id
router.get("/profile/list/:id", isLoggedIn, async(req, res, next) => {
  const listId = req.params.id
  const user = req.session.user
  const currentList = await ShoppingList.findById(listId).populate('need').populate('have')

  res.render("list", {needs: currentList.need, haves: currentList.have, listId});
});




module.exports = router;
