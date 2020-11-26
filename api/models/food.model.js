const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    proteins: {
        type: Number,
        required: true
    },
    carbohydrates: {
        type: Number,
        required: true
    },
    fats: {
        type: Number,
        required: true
    },
    kcals: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    dateYear: {
        type: Number,
        required: true
    },
    dateMonth: {
        type: Number,
        required: true
    },
    dateDay: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
}
);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;