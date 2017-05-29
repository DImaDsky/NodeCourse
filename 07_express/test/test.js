"use strict";
const http = require('http');
const expect = require('chai').expect;

const reqOptions = {
    hostname: 'localhost',
    port: 1337,
    path: '/api/users/',
    family: 4,
    headers: {
        'Content-Type': 'application/json'
    }
};
function sendReq(method, cb) {
    reqOptions.method = method;

    let data = '',
        apiReq = http.request(reqOptions, apiRes => {

            apiRes.setEncoding('utf8');
            apiRes.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                if(typeof cb == 'function') {
                    cb('err', chunk);
                }
            });
            apiRes.on('end', () => {
                console.log('No more data in response.');
            });
            /**/
        });

    apiReq.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    if(method == 'POST') {
        data = JSON.stringify({'name':'NewName','score':0});
    }
     console.log(data);
    apiReq.write(data);
    apiReq.end();

}

describe('Rest api tests:', () => {
    it('create', done => {
        sendReq('POST', (err, data) => {
            let parsed = JSON.parse(data);
            console.log('zzz1',err, parsed)
            expect(parsed).to.be.a('array', 'not array');
            expect(parsed[0]).to.include.all.keys('name','score');
            done();
        })
    });

    it('delete', done => {
        sendReq('DELETE', (err, data) => {
            console.log('zzz2', err, data)
            expect(data).to.equal('Not Found','unexpected value')
            done();
        })
    });
});