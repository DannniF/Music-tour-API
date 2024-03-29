// DEPENDENCIES
const express = require('express');
const app = express();
const { Sequelize } = require('sequelize');


// CONFIGURATION / MIDDLEWARE
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Sequalize connection
// const sequelize = new Sequelize({
//     storage: process.env.PG_URI,
//     dialect: 'postgres',
//     username:  process.env.PG_USERNAME,
//     password: process.env.PG_PASSWORD,
// });

// try {
//     sequelize.authenticate();
//     console.log(`connected w/ Sequelize at ${process.env.PG_URI}`);
// } catch (err) {
//     console.log(`unable to connect to postgres: ${err}`);
// };

//CONTROLERS
const bandsController = require('./controllers/bands_controller');
app.use('/bands', bandsController);

const eventController = require('./controllers/events_controller');
app.use('/events', eventController);

const stageController = require('./controllers/stages_controller');
app.use('/stages', stageController)

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Joji'
    });
});

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`);
});
