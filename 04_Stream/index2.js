"use strict";
const stream = require('stream');

class Readable extends stream.Readable{
    constructor(options){
        super(options);
    }
    _read(size){
        this.push(Math.round(Math.random()*100) + '');
    }
}

class Writable extends stream.Writable{
    constructor(options){
        super(options);
    }
    _write(chunk, encoding, next){
        console.log(chunk, encoding);
        next();
    }
}

const transform = new stream.Transform({
    decodeStrings : false,
    transform(chunk, encoding, next) {
        chunk = chunk + 1;
        this.push(chunk);
        next();
    }
});
transform.setDefaultEncoding("utf8");

const input = new Readable();
input.setEncoding("utf8");
const output = new Writable({defaultEncoding:"utf8"});
output.setDefaultEncoding("utf8");

input.pipe(transform).pipe(output);
