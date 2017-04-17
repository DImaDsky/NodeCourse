"use strict";
const app = (require('express'))();
const bodyParser = require('body-parser');
const api = require('./api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use('/api', api);
/*

/**/

app.all('*', (req, res) => {
    res.send({message: 'all'});
});

app.listen(1337, ()=>{
    console.log('Server start');
});