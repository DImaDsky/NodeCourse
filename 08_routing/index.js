"use strict";
const app = (require('express'))();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/hello(/:name)?', (req, res) => {
    res.status(200).send('Hello, ' + (req.params.name || 'stranger'));
    // Почему возвращает в браузер 'Hello, undefined'?, а в консоль  'Hello, stranger'
});

app.get('*', (req, res) => {
    res.send(200, 'Hello, Express.js');
});

function checkKey(req, res, next){
    if (!req.headers.Key){
        res.status(401).send('Not authorized');
        return;
    }
    next();
}
app.post('/post', checkKey, (req, res) => {
    res.json(req.body);
    //В браузере Failed to load responce data
});

app.all('/favicon.ico', (req, res) => {
    console.log(req.originalUrl);
});

app.all('*', (req, res) => {
    // "You requested URI: [полный URI запроса]"
    res.send('You requested URI:' + req.originalUrl  )
});

app.use((err, req, res, next)=>{
    console.log('err', err);
    res.send(500, 'Server Error');
});
app.listen(1337, ()=>{
    console.log('Server start');
});