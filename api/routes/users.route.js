const router = require('express').Router();
let User = require('../models/user.model');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const age = Number(req.body.age);
  const isMale = Boolean(req.body.isMale);
  const currentWeight = Number(req.body.currentWeight);
  const goalWeight = Number(req.body.goalWeight);
  const activity = Number(req.body.activity);


  const newUser = new User({
    email,
    password,
    username,
    age,
    isMale,
    currentWeight,
    goalWeight,
    activity
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

