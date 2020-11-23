const router = require('express').Router();
const { response } = require('express');
const passport = require('passport');
const Exercise = require('../models/exercise.model');


router.post('/add',passport.authenticate('jwt', {session: false}), (req,res) => {
  console.log(req.headers);

  const userId = req.body.userId;
  const dateYear = req.body.dateYear;
  const dateMonth = req.body.dateMonth;
  const dateDay = req.body.dateDay;
  const exercises = req.body._id;

  const newDiary = new Diary({
    userId,
    exercises,
    dateYear,
    dateMonth,
    dateDay
  });

  
  newDiary.save()
  .then(()=> res.json('Diary added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;