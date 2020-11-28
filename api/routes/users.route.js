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
    .catch(err => res.status(400).json(err));
});



router.route('/register').post((req, res) => {
  User.find({email: req.body.email})
    .exec()
    .then(user => {
      if (user.length >= 1){
        return res.status(409).json({
          message: "Użytkownik o tym emailu instnieje"
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
            const isMale = req.body.isMale;
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
              .then(() => res.json('Dodano użytkownika!'))
              .catch(err => res.status(400).json(err));
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
          message: "Błąd Autoryzacji!"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Błąd Autoryzacji!"
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
          message: "Błąd Autoryzacji!"
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


router.patch('/updateUser', passport.authenticate('jwt', { session: false }), (req, res) => { 
  const id = req.user._id;

  console.log(id);

  User.updateOne({_id:id}, {$set: req.body})
  .exec()
  .then(result =>{
      console.log(result);
      res.status(200).json(result);
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
  });
});



router.delete('/deleteUser', passport.authenticate('jwt', { session: false }), (req, res) =>{
  const id = req.user._id;

  User.findByIdAndDelete(id)
  .exec()
  .then(result => {
    res.status(200).json("Użytkownik usunięty!");
  })
  .catch(err => {
    res.status(500).json({errror: err});
  });
})

module.exports = router;

