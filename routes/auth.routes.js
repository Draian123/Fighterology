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
    await User.create(body)
    res.redirect('/auth/login')
    
}catch(err) {
    console.error(err)
}
})

router.get("/login", (req, res, next) => {
  let allShoppingList = req.session.allShoppingList
  res.render("login");
});

router.post('/login', async(req, res) => {
  const body = req.body
  let allShoppingLists = await ShoppingList.find()
  console.log(allShoppingLists)
  req.session.allShoppingLists = allShoppingLists
  // console.log(body)
  try{
      const userFound = await User.find({name: body.name})

  if(userFound == null){
      throw new Error('User not found')
  }else{
      if(bcrypt.compareSync(body.password, userFound[0].password)){
          req.session.user = userFound
          res.redirect('profile')
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
  
  console.log(req.session.allShoppingLists)
  res.render("profile", {allShoppingLists: req.session.allShoppingLists});
});

router.post("/profile/delete/:id", (req, res, next) => {
  const listId = req.params.id
  console.log(listId)
  ShoppingList.findByIdAndDelete(listId)
  res.redirect("profile");
});

router.get("/profile/:id", (req, res, next) => {
  const listId = req.params.id

  res.redirect("profile");
});

router.get("/products", async(req, res, next) => {
  const allProducts = await Product.find()
  // console.log(allProducts)
  res.render("allProducts", {allProducts});
});



module.exports = router;
