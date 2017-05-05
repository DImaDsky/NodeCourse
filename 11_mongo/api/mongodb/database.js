"use strict"
const mongodb = require('mongodb');//npm i mongodb
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = 'mongodb://localhost:27017/test';

module.exports = {
    create: function (data) {
        return new Promise(resolve => {
            MongoClient.connect(url, function(err, db) {
                if (err) {console.log(err)}
                db.collection('users').insertOne(data, resolve);
                db.close();
                resolve();
            });
        })
    },
    read: function () {
        let users = [];
        return new Promise(resolve => {
            MongoClient.connect(url, function(err, db) {
                if (err) {console.log('err', err)}
                let cursor = db.collection('users').find();
                cursor.each((err, doc)=>{
                    if(err) {
                        console.log(err)
                        throw err;
                    }
                    if(doc){
                        users.push({
                            name: doc.name,
                            surname: doc.surname,
                            tel: doc.tel,
                            id: doc._id.valueOf()
                        });
                    } else {
                        resolve(users);
                    }
                });
                // (cursor.count()).then(r=>{
                //     console.log('rrrr',r)
                // })

                db.close();

            });

        })
    },
    update: function (id, data) {
        return new Promise(resolve => {
            MongoClient.connect(url, function(err, db) {
                if (err) {console.log(err)}

                db.collection('users').updateOne({_id: new ObjectID(id)}, data, (err, results) => {
                    if(err){
                        console.log(err)
                        return
                    }
                    console.log(results.result);
                    resolve();
                });
                db.close();
            });
        })
    },
    delete: function (id) {
        return new Promise(resolve => {
            MongoClient.connect(url, function(err, db) {
                if (err) {console.log(err)}
                db.collection('users').removeMany({_id: new ObjectID(id)}, (err, results) => {
                    if(err){
                        console.log(err)
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
