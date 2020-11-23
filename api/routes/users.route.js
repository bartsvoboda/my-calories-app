const router = require('express').Router();
let User = require('../models/user.model');
const passport = require('../config/passport');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


router.get('/getUser', passport.authenticate('jwt', { session: false }), (req, res) => { 
  res.send(req.user);
});

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
  //Check if user already exist
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1){
        return res.status(409).json({
          message: "Mail exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err,hash) => {
          if(err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const email = req.body.email;
            const password = hash;
            const username = req.body.username;
            const age = Number(req.body.age);
            const isMale = Boolean(req.body.isMale);
            const height = Number(req.body.height);
            const currentWeight = Number(req.body.currentWeight);
            const goalWeight = Number(req.body.goalWeight);
            const activity = req.body.activity;

            const newUser = new User({
              email,
              password,
              username,
              age,
              isMale,
              height,
              currentWeight,
              goalWeight,
              activity
            });

            newUser.save()
              .then(() => res.json('User added!'))
              .catch(err => res.status(400).json('Error: ' + err));
          }
        });
      }
    })
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
          
          return res.status(200).send(token);
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;

