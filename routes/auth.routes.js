const express = require('express');
const router = express.Router();
const { isLoggedOut, isLoggedIn } = require('../middleware/route-guard');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("signUp");
});

router.post("/", (req, res, next) => {

})

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/profile", (req, res, next) => {
  res.render("profile");
});

// router.get('/profile', isLoggedIn, async(req, res) => {
//   const user = req.session.user
//   res.render('profile', {user})
// });

module.exports = router;
