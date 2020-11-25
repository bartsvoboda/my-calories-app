const router = require("express").Router();
const passport = require('passport');
const Food = require('../models/food.model');


router.get('/', passport.authenticate('jwt', { session: false}), (req, res)=>{
    const userId = req.user.id;
  
    Food.find({userId: userId})
    .then( foods =>{
      res.status(200).json(foods);
    })
    .catch(err =>{
      res.status(500).json(err);
    });
});

router.get('/:id', passport.authenticate('jwt', { session: false}), (req, res)=>{
    const id = req.params.id;
  
    Food.findById({_id: id})
    .then( food =>{
      console.log(food);
      res.status(200).json(food);
    })
    .catch(err =>{
      res.status(500).json(err);
    });
});

router.route('/:id').delete((req,res) => {
    Food.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send(200).json('Food deleted')
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

router.post('/:id',passport.authenticate('jwt', {session: false}), (req,res) => {
    Food.findById(req.params.id)
      .then(food => {
        food.name = req.body.name,
        food.weight = Number(req.body.duration),
        food.proteins = Number(req.body.proteins),
        food.carbohydrates = Number(req.body.carbohydrates),
        food.fats = Number(req.body.fats),
        food.kcals = Number(req.body.kcals),
        food.dateYear = Number(req.body.dateYear),
        food.dateMonth = Number(req.body.dateMonth),
        food.dateDay = Number(req.body.dateDay)
  
        food.save()
          .then(() => res.json('Food updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  
});


router.post('/add',passport.authenticate('jwt', {session: false}), (req,res) => {
    const userId = req.user.id;
    const name = req.body.name;
    const weight = Number(req.body.weight);
    const proteins = Number(req.body.proteins);
    const carbohydrates = Number(req.body.carbohydrates);
    const fats = Number(req.body.fats);
    const kcals = Number(req.body.kcals);
    const dateYear = Number(req.body.dateYear);
    const dateMonth = Number(req.body.dateMonth);
    const dateDay = Number(req.body.dateDay);

    const newFood = new Food({
        name,
        weight,
        proteins,
        carbohydrates,
        fats,
        kcals,
        userId,
        dateYear,
        dateMonth,
        dateDay
    });

    newFood.save()
    .then(() => res.json('Food added!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;