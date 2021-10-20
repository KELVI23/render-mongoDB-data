// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://readonly:<password>@cluster0.upcyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const config = require('./config');
const mongoose = require('mongoose');

//create db connection string
const databaseParameters = config.cyberpatient;
var dbConnection = "mongodb://";

//if connection requires username and password
if (databaseParameters.username && databaseParameters.password && databaseParameters.username.length > 0 && databaseParameters.password.length > 0 ){
    dbConnection += databaseParameters.username + ":" + databaseParameters.password + "@";
}

//dbConnection += databaseParameters.host + ":" + databaseParameters.port + "/" + databaseParameters.collection;
dbConnection += "meds.2021@cluster0.upcyw.mongodb.net/cyberpatient?retryWrites=true&w=majority"
module.exports = function(callback){
    // mongoose.connect(dbConnection);
    mongoose.connect("mongodb+srv://readonly:meds.2021@cluster0.upcyw.mongodb.net/cyberpatient?retryWrites=true&w=majority");
    var db = mongoose.connection;

    //connection events
    //successful
    db.on('connected', function (){
        console.log('Mongoose connected')
    });

    //if connection throws error
    db.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
        process.exit(1);
    });

    //whe connection is disconnected
    db.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
        process.exit(1);
    });

    db.on('open', function (){
        callback(mongoose);
    });
}