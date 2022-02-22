const express = require('express');
const router = express.Router()

const ContinentModel = require('../model/Continent')

router.get('/', async (request, response) => {
    const continents = await ContinentModel.find().populate('countries');
    response.status(200).json(continents);
});

module.exports = router;