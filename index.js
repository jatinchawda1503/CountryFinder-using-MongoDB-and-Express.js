require('dotenv').config();



const express = require('express')

require('./conf/database');

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/todo', function (req, res) {
    res.send('World');
  });

app.listen(3000);