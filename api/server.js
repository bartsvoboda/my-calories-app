const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('./config/passport');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

//connection to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Pomyślnie połączono z bazą danych");
})
//prosta route
app.get("/", (req, res) => {
    res.json({
        message: "Testowa route"
    });
});


app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const exercisesRouter = require('./routes/exercises.route');
const usersRouter = require('./routes/users.route');
const foodRouter = require('./routes/foods.route');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/foods', foodRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});