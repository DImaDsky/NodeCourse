"use strict";
const express = require('express');
const app = module.exports = express();

app.use('/users', require('./users'));

app.all('*', (req, res) => {
    res.json({message: 'ok'})

});
