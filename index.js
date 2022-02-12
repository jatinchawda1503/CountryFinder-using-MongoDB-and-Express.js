require('dotenv').config();


const express = require('express')

require('./conf/database');
const CountryModel = require('./model/country');
const app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World');
});

// app.get('/countries', async (req , res) =>{
//   const countries = await CountryModel.find();
//     res.status(200).json(countries);
// });


app.get('/countries', async (req , res) =>{
  const CountryId = req.params.id
  const countries = await CountryModel.countDocuments(CountryId);
  console.log(countries);
    res.status(200).json({msg : countries  });
});


app.get('/countries/:id', async (req , res) =>{
  const CountryId = req.params.id
  const countries = await CountryModel.find({
    _id: CountryId
    });

    res.status(200).json(countries);
});

app.delete('/countries/:id', async (req , res) =>{
  const CountryId = req.params.id
  await CountryModel.findOneAndDelete({
    _id: CountryId
    });
    res.status(200).json({msg : "Country deleted"});
});


app.post('/countries', async (req , res) =>{
  console.log(req.body);
  const {name , isoCode} = req.body

  const country = await CountryModel.create({
      name: name,
      isoCode
    });

    res.status(200).json(country);
});


app.put('/countries/:id"', async (req , res) =>{
  const CountryId = req.params.id
  const {name , isoCode} = req.body

  const country = await CountryModel.findOneAndUpdate({
    _id: CountryId
    },{
      name: name,
      isoCode
     },{
       new: true
     }

    );
    res.status(200).json(country);
});

app.listen(3000);

//[4:41 PM] Loïc Dandoy
//First query: Send back the number of countries in the database

//[4:42 PM] Loïc Dandoy
//Second query: Send back all the country with a name started by a strung given by the user

