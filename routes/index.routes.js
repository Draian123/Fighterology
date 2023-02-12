const express = require('express');
const ShoppingList = require('../models/ShoppingList.model');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  
  res.render("index");
});

router.post("/addProduct/:id", async (req, res, next) => {
  const body = req.body
  const id = req.params.id
  var user = req.session.user
  console.log(body)
  console.log(id)
  let currentList = await ShoppingList.findById(id)
  console.log(currentList)
  currentList.need.push(req.body.name)
  currentList.save()
  const findUser = 

  res.redirect("/auth/profile");
});

module.exports = router;
