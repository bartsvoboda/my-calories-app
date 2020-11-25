const router = require('express').Router();
const { response } = require('express');
const passport = require('passport');
const Exercise = require('../models/exercise.model');


router.get('/', passport.authenticate('jwt', { session: false}), (req, res)=>{
  const userId = req.user.id;

  Exercise.find({userId: userId})
  .then( exercises =>{
    console.log(exercises);
    res.status(200).json(exercises);
  })
  .catch(err =>{
    res.status(500).json(err);
  });
});

router.get('/:id', passport.authenticate('jwt', { session: false}), (req, res)=>{
  const id = req.params.id;

  Exercise.findById({_id: id})
  .then( exercise =>{
    console.log(exercise);
    res.status(200).json(exercise);
  })
  .catch(err =>{
    res.status(500).json(err);
  });
});

router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const id = req.params.id;

  Exercise.updateOne({_id:id}, {$set: req.body})
  .exec()
  .then(result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  })
});


router.post('/add',passport.authenticate('jwt', {session: false}), (req,res) => {
  const userId = req.user.id;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const kcalperhour = Number(req.body.kcalperhour);
  const dateYear = Number(req.body.dateYear);
  const dateMonth = Number(req.body.dateMonth);
  const dateDay = Number(req.body.dateDay);


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