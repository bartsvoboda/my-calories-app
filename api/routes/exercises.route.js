const router = require('express').Router();
const { response } = require('express');
const passport = require('passport');
const Exercise = require('../models/exercise.model');


router.get('/', passport.authenticate('jwt', { session: false}), (req, res)=>{
  const date = req.body.date;
  var tomorrow = new Date();
  var today = new Date(req.body.date);
  tomorrow.setDate(today.getDate()+1);
  tomorrow.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  // const userId = req.body.userId;
    Exercise.find({date: {$gt:today, $lt:tomorrow}})
  .then(response =>{
    console.log(response);
    res.status(500).send(response);
  })
  .catch(err =>{
    res.status(200).send(err);
  });
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.kcalperhour = Number(req.body.kcalperhour);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


router.post('/add',passport.authenticate('jwt', {session: false}), (req,res) => {
  const userId = req.user.id;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const kcalperhour = Number(req.body.kcalperhour);
  const dateYear = req.body.dateYear;
  const dateMonth = req.body.dateMonth;
  const dateDay = req.body.dateDay;


  const newExercise = new Exercise({
    userId,
    description,
    duration,
    kcalperhour,
    dateYear,
    dateMonth,
    dateDay
  });

  console.log(newExercise);

  newExercise.save()
  .then(() => res.json('Exercise added!'))
  .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;