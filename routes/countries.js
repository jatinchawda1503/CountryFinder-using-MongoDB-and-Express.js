const express = require('express');
const app = express();
const { append } = require('express/lib/response');
const router = express.Router()

const CountryModel = require('../model/country')

router.get('/', async (request, response) => {
    const countries = await CountryModel.find().populate('continent');
    response.status(200).json(countries);
});

router.get('/:id', async (request, response) => {
    const countryId = request.params.id;

    const countries = await CountryModel.findOne({
        _id: countryId
    });
    
    response.status(200).json(countries);
});

router.post('/', async (request, response) => {
    const {name, isoCode} = request.body

    const country = await CountryModel.create({
        name: name,
        isoCode
    });

    response.status(200).json(country);
});

router.delete('/:id', async (request, response) => {
    const countryId = request.params.id;

    await CountryModel.findOneAndDelete({
        _id: countryId
    });

    response.status(200).json({msg: 'Country well deleted !'});
});

router.put('/:id', async (request, response) => {
    const countryId = request.params.id;
    const {name, isoCode} = request.body

    const country = await CountryModel.findOneAndUpdate({
        _id: countryId
    },{
        name,
        isoCode
    },{
        new: true
    });

    response.status(200).json(country);
});

router.get('/:id', async (request, response) => {
    //const query = request.params.query
    //const countries = await CountryModel.find().populate('continent');
    const countries = await CountryModel.find({ 'name': { $regex: 'fr' , $options: 'i' } });
    
    response.status(200).json(countries);
});




module.exports = router;