require('dotenv').config();
const express = require('express');

require('./conf/database');
const countriesRoutes = require('./routes/countries');
const continentsRoutes = require('./routes/continents');

const app = express();
app.use(express.json());

app.use('/countries', countriesRoutes);
app.use('/continents', continentsRoutes);


app.get('/', (request, response) => {
    response.status(200).json({msg: "It works !"});
});



app.listen(3000);

//[4:41 PM] Loïc Dandoy
//First query: Send back the number of countries in the database

//[4:42 PM] Loïc Dandoy
//Second query: Send back all the country with a name started by a strung given by the user

