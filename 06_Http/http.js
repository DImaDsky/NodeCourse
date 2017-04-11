// http://127.0.0.1:1337/?lastName=Qwert&firstName=Bob

'use strict'
const http = require('http');
const https = require('https');
const url = require('url');
const querystring = require('querystring');

const apiOptions = {
    hostname: 'netology.tomilomark.ru',
    port: 80,
    path: '/api/v1/hash',
    method: 'POST',
    headers: {
        'Firstname': 'someName',
        'Content-Type': 'application/json'
    }
};

let server = new http.Server( (req, res) => {
    let parsed = url.parse(req.url, true);
    let lastName = parsed.query.lastName;

    if (!lastName || !parsed.query.firstName){
        res.end('no data');
    }

    let postData = querystring.stringify({
        lastName: lastName
    });
    apiOptions.headers.Firstname =  parsed.query.firstName;

    let apiReq = http.request(apiOptions, apiRes => {
        console.log('apiRes', apiRes);//didnt find json response in apiRes
        res.end('zzzzz');
    });

    apiReq.write(postData);
    apiReq.end();
});
server.listen(process.env.PORT || 1337, '127.0.0.1');