"use strict";

const hash = require('crypto').createHash('md5');
const fs = require('fs');
const stream = require('stream');

const input = new fs.ReadStream('./Power_of_silence.txt', { encoding:'UTF-8'});
const output = new fs.WriteStream('./output.txt', {defaultEncoding: 'utf8'});

// input.on("readable", function() {
//         let chunk;
//         while( (chunk = input.read(20)) ) {
//             console.log('input.read |',chunk.length);
//         }
//     });//on("data") inside Transform

const myTransform = new stream.Transform({
    decodeStrings : false,
    transform(chunk, encoding, callback) {
        chunk = chunk.toUpperCase();
        hash.update(chunk, "utf8")
        //this.push(chunk);
        callback();
    },
    flush(callback){
        debugger
        let zz = hash.digest('hex');
        this.push(zz);
        callback();
    }
});
myTransform.setDefaultEncoding("utf8");

input
    .pipe(myTransform)
    .pipe(output);

// input.pause();
