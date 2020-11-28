const router = require("express").Router();
const passport = require('passport');
const Food = require('../models/food.model');


router.get('/', passport.authenticate('jwt', { session: false }), (req, res)=> {
    const userId = req.user.id;
  
    Food.find({userId: userId})
    .then( foods => {
      res.status(200).json(foods);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res)=> {
    const id = req.params.id;
  
    Food.findById({_id: id})
    .then( food => {
      console.log(food);
      res.status(200).json(food);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const id = req.params.id;

  Food.findByIdAndDelete(id)
  .then(() => res.status(200).json('Produkt usunięto'))
  .catch(err => res.status(400).json(err));
});


router.patch('/update/:id',passport.authenticate('jwt', { session: false }), (req,res) => {
  const id = req.params.id;

  Food.updateOne({_id:id}, {$set: req.body})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
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
    .then(() => res.json('Dodano jedzenie!'))
    .catch(err => res.status(400).json(err));
});

module.exports = router;