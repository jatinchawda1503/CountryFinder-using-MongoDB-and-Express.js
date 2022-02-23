const express = require('express');
const router = express.Router()

const ContinentModel = require('../model/Continent')


// Create Continents or countries 
router.post('/', async (request, response) => {
    const {name} = request.body

    const continents = await ContinentModel.create({
        name: name
    });

    response.status(200).json(continents);
});


//Get continents and the number of countries 

// router.get('/', async (request, response) => {
//     const continents = await ContinentModel.find().populate('countries');
//     response.status(200).json(continents);
// });

router.get('/', async (request, response) => { 
    const continents = await ContinentModel.aggregate([
        {
           $project: {
               _id: 0,
              name: "$name",
              countries: { $size : "$countries" } }
           }
     ] )
    response.status(200).json(continents);
});

//fourth country of a continent 

router.get('/:name', async (req, res) => { 
    const name = req.params.name;
	const continents = await ContinentModel.find({ name: { $regex: '^' + name, $options: 'i' } },{'name':1,_id:0}).populate({ path: 'countries', select: 'name',options: { limit: 4, sort:'name' } })    
    res.status(200).json(continents);
});




module.exports = router;