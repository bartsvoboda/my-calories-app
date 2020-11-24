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
    user_id: {
        type: String,
        required: true
    },
    dateYear: {
        type: String,
        required: true
    },
    dateMonth: {
        type: String,
        required: true
    },
    dateDay: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}
);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;