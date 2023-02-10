const express = require('express');
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require('../middleware/route-guard');
const Fighter = require('../models/Fighter.model');
const Trainer = require('../models/Trainer.model')

/* GET home page */
router.get("/", async (req, res, next) => {
  let allTrainers = await Trainer.find()
  console.log(allTrainers)
  res.render("signUp",{ allTrainers});
});

router.post("/", async(req, res, next) => {
  let body = req.body
  const createdFighter = await Fighter.create(body)

  if(createdFighter){
      res.redirect('auth/login')
  }

})

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/profile", (req, res, next) => {
  let createdFighter = req.session.createdFighter
  res.render("profile", {createdFighter});
});

// router.get('/profile', isLoggedIn, async(req, res) => {
//   const user = req.session.user
//   res.render('profile', {user})
// });

module.exports = router;
