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
    const {name, isoCode , population, continent } = request.body

    const country = await CountryModel.create({
        name: name,
        isoCode : isoCode,
        population : population,
        continent : continent
    });

    response.status(200).json(country);
});

router.delete('/:id.', async (request, response) => {
    const countryId = request.params.id;

    await CountryModel.findOneAndDelete({
        _id: countryId
    });

    response.status(200).json({msg: 'Country well deleted !'});
});

router.put('/:id', async (request, response) => {
    const countryId = request.params.id;
    const {name, isoCode, population, continent} = request.body

    const country = await CountryModel.findOneAndUpdate({
        _id: countryId
    },{
        name : name,
        isoCode : isoCode,
        population : population,
        continent: continent
    },{
        new: true
    });

    response.status(200).json(country);
});


//get all the country where a letter or word given

router.get('/search/:name', async (request, response) => {
    const name = request.params.name
    const countries = await CountryModel.find({ 'name': { $regex: "^" + name , $options: 'i' } });
    response.status(200).json(countries);
});

//Countries order by number of less population

router.get('/sort/population', async function (req, res) { 
	const countries = await CountryModel.find({}, {'name':1,_id:0,'population':1}).sort("population") 
    res.status(200).json(countries);
})

//Countries which have u 

router.get('/filter/population', async function (req, res) {
	const countries = await CountryModel.find(
        {
            name: 
                { $regex: 'u', $options: 'i' }, 'population': { $gt : 100000}
        }, 
            {'name':1,
                _id:0,
                'population':1
            }).sort("population") 

        res.status(200).json(countries);
})




module.exports = router;