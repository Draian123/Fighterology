const express = require('express');
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require('../middleware/route-guard');
const Fighter = require('../models/Fighter.model');
const Trainer = require('../models/Trainer.model')
const bcrypt = require('bcrypt');

/* GET home page */
router.get("/", async (req, res, next) => {
  let allTrainers = await Trainer.find()
  // console.log(allTrainers)
  res.render("signUp",{ allTrainers});


});

router.post("/", async(req, res, next) => {
  // let body = req.body
  // const createdFighter = await Fighter.create(body)
  // req.session.createdFighter = createdFighter

  // if(createdFighter){
  //     res.redirect('auth/login')
  // }


  try {
    let body = req.body;
    const salt = bcrypt.genSaltSync(12)

    let passwordHash = bcrypt.hashSync(body.password, salt)
    // delete body.password
    body.password = passwordHash
    await Fighter.create(body)
    res.redirect('/')
    
}catch(err) {
    console.error(err)
}
})

router.get("/login", (req, res, next) => {
  let fighter = req.session.createdFighter
  res.render("login",{fighter});
});

router.post('/login', async(req, res) => {
  const body = req.body
  // console.log(body)
  try{
      const fighterFound = await Fighter.find({name: body.name})

  if(fighterFound == null){
      throw new Error('User not found')
  }else{
      if(bcrypt.compareSync(body.password, fighterFound[0].password)){
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
  let createdFighter = req.session.createdFighter
  res.render("profile", {createdFighter});
});


module.exports = router;
