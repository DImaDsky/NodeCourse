"use strict";
const mongodb = require('mongodb');//npm i mongodb
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = 'mongodb://localhost:27017/test';

module.exports = {
    create: function (collection, data) {
        return new Promise(resolve => {
            MongoClient.connect(url, function(err, db) {
                if (err) {console.log('err on ' + collection, err)}
                db.collection(collection).insertOne(data, resolve);
                db.close();
            });
        })
    },
    read: function (collection) {
        let result = [];
        return new Promise(resolve => {
            MongoClient.connect(url, function(err, db) {
                if (err) {console.log('err on ' + collection, err)}
                let cursor = db.collection(collection).find();
                cursor.each((err, doc)=>{
                    if(err) {
                        console.log(err);
                        throw err;
                    }
                    if(doc){
                        doc.id = doc._id.valueOf();
                        result.push(doc);
                    } else {
                        resolve(result);
                    }
                });
                db.close();
            });
        })
    },
    update: function (collection, id, data) {
        return new Promise(resolve => {
            MongoClient.connect(url, function(err, db) {
                if (err) {console.log('err on ' + collection, err)}

                db.collection(collection).updateOne({_id: new ObjectID(id)}, data, (err, results) => {
                    if(err){
                        console.log(err);
                        return
                    }
                    console.log(results.result);
                    resolve();
                });
                db.close();
            });
        })
    },
    delete: function (collection, id) {
        return new Promise(resolve => {
            MongoClient.connect(url, function(err, db) {
                if (err) {console.log('err on ' + collection, err)}
                db.collection(collection).removeMany({_id: new ObjectID(id)}, (err, results) => {
                    if(err){
                        console.log(err);
                        return
                    }
                    console.log(results.result);
                    resolve();
                });
                db.close();
            });

        })
    }
};
