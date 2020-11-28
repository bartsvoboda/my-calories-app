const router = require('express').Router();
const { response } = require('express');
const passport = require('passport');
const Exercise = require('../models/exercise.model');


router.get('/', passport.authenticate('jwt', { session: false }), (req, res)=>{
  const userId = req.user.id;

  Exercise.find({userId: userId})
  .then(exercises => {
    res.status(200).json(exercises);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

router.get('/:id', passport.authenticate('jwt', { session: false} ), (req, res)=>{
  const id = req.params.id;

  Exercise.findById({_id: id})
  .then(exercise => {
    console.log(exercise);
    res.status(200).json(exercise);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});


router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const id = req.params.id;

  Exercise.findByIdAndDelete(id)
  .then(() => res.status(200).json('Ćwiczenie usunięto'))
  .catch(err => res.status(400).json(err));
});


router.patch('/update/:id',passport.authenticate('jwt', { session: false }), (req,res) => {
  const id = req.params.id;

  Exercise.updateOne({_id:id}, {$set: req.body})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


router.post('/add',passport.authenticate('jwt', { session: false }), (req,res) => {
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

  newExercise.save()
  .then(() => res.status(200).json('Dodano ćwiczenie!'))
  .catch(err => res.status(400).json(err));
});

module.exports = router;