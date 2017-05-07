const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/test';
mongoose.connect(url);
let db = mongoose.connection;
db.on('error', err => {
    console.log(err);
});
db.once('open', () => {
    console.log('');
});

module.exports = {
    mongoose:mongoose,
    db:db
};