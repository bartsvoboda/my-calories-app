const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const diarySchema = new Schema({
    userId: {
        type:String,
        required: true
    },
    dateYear:{
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
    },
    products: {
        type:Array,
        required: true
    },
    exercises: {
        type: Array,
        required: true
    }
});

const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;