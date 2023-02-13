const express = require('express');
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require('../middleware/route-guard');
const User = require('../models/User.model');
const Product = require('../models/Product.model')
const ShoppingList = require('../models/ShoppingList.model')
const bcrypt = require('bcrypt');

/* GET home page */
router.get("/", async (req, res, next) => {
  // let allShoppingLists = await ShoppingList.find()
  res.render("signUp");


});

router.post("/", async(req, res, next) => {
  try {
    let body = req.body;
    const salt = bcrypt.genSaltSync(12)
    // console.log(body)
    let passwordHash = bcrypt.hashSync(body.password, salt)
    // delete body.password
    body.password = passwordHash
    var createdUser = await User.create(body)
    // console.log(createdUser)
    let newShoppingList = await ShoppingList.create({
      name: "groceries",
      userId: createdUser._id
    })
    // createdUser.shoppingLists.insert(newShoppingList)
    res.redirect('/auth/login')
    
}catch(err) {
    console.error(err)
}
})

router.get("/login", (req, res, next) => {
  // let allShoppingList = req.session.allShoppingList
  res.render("login");
});

router.post('/login', async(req, res) => {
  const body = req.body
  // let allShoppingLists = await ShoppingList.find()
  // console.log(allShoppingLists)
  // req.session.allShoppingLists = allShoppingLists
  // console.log(body)
  try{
      let userFound = await User.find({name: body.name})

  if(userFound == null){
      throw new Error('User not found')
  }else{
      if(bcrypt.compareSync(body.password, userFound[0].password)){
          let allShoppingListsofUser = await ShoppingList.find({userId: userFound[0]._id})
          console.log(allShoppingListsofUser)
          console.log(userFound[0].shoppingLists)
          userFound[0].shoppingLists = allShoppingListsofUser
          console.log(userFound[0])
          req.session.user = userFound[0]
          // console.log(req.session.user.shoppingLists)
          res.redirect('/auth/profile')
      } else {
          // res.render('signIn', {errorMessage: 'wrong password', body})
          throw new Error('Invalid password')
      }
  }
  }catch(err) {

      // console.error('say:', err)
          res.render('login', {body, err: err})
  }
});


router.get("/profile", (req, res, next) => {
  
  // console.log(req.session.allShoppingLists)
  // console.log(req.session.user)
  res.render("profile", {allShoppingLists: req.session.user.shoppingLists});
});

router.post("/profile/delete/:id", async (req, res, next) => {
  const listId = req.params.id
  // console.log(listId)
  await ShoppingList.findByIdAndDelete(listId)
  let allShoppingLists = await ShoppingList.find({userId: req.session.user._id})
  console.log(allShoppingLists)
  req.session.user.shoppingLists = allShoppingLists
  res.redirect("/auth/profile");
});

router.get("/profile/:id", (req, res, next) => {
  // const listId = req.params.id
  res.render("profile", {allShoppingLists: req.session.user.shoppingLists})
  // res.redirect("profile");
});



router.post("/profile/createNewList", async (req, res, next) => {
  const newList = req.body.newList
  // console.log(newList)
  var user = req.session.user
  // console.log(user)
  await ShoppingList.create({name: newList, userId: user._id})
  let userShoppingLists = await ShoppingList.find({userId: user._id})
  // console.log(userShoppingLists)
  // console.log(user)
  req.session.user.shoppingLists = userShoppingLists
  res.redirect("/auth/profile");
});
//adds a ? to get routes with id
router.get("/profile/list/:id", async(req, res, next) => {
  const listId = req.params.id
  const user = req.session.user
  // console.log(user)
  const currentList = await ShoppingList.findById(listId).populate('need')
  // console.log(currentList)

  // const allProducts = await Product.find()
  // console.log(allProducts)
  res.render("list", {needs: currentList.need, haves: currentList.have, listId});
});




module.exports = router;
