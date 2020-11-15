const router = require("express").Router();

// Load food model
let Food = require("../models/food.model");

router.route('/').get((req, res) => {
    Food.find()
    .then(foods =>{
        res.status(200).json(foods)
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    })
});

router.route('/:id').delete((req,res) => {
    Food.findByIdAndDelete(req.params.id)
        .then(() => {
            res.send(200).json('Food deleted')
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').post((req,res) => {
    Food.findById (req.params.id)
        .then(food => {
            food.name = req.body.name;
            food.weight = Number(req.body.weight);
            food.proteins = Number(req.body.proteins);
            food.carbohydrates = Number(req.body.carbohydrates);
            food.fats = Number(req.body.fats);
            food.kcals = Number(req.body.kcals);
            food.user_id = req.body.user_id;
            food.date = Date.parse(req.body.date);

            food.save()
                .then(()=> res.json('Food updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req,res) => {
    const name = req.body.name;
    const weight = Number(req.body.weight);
    const proteins = Number(req.body.proteins);
    const carbohydrates = Number(req.body.carbohydrates);
    const fats = Number(req.body.fats);
    const kcals = Number(req.body.kcals);
    const user_id = req.body.user_id;
    const date = Date.parse(req.body.date);

    const newFood = new Food({
        name,
        weight,
        proteins,
        carbohydrates,
        fats,
        kcals,
        user_id,
        date
    });

    newFood.save()
    .then(() => res.json('Food added!'))
    .catch(err => res.status(400).json('Error: '+ err));
});

module.exports = router;