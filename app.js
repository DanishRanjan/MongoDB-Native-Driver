//jshint esversion:6

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//consction URL
const url = 'mongodb://localhost:27017';

//Database Name
const dbName = 'fruitsDB';

//Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

//use connect method to connect to the server
client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // insertDocuments(db, function(){
    //     client.close();
    // });

    findDocuments(db, function(){
    client.close();
    });
    
});

const insertDocuments = function (db, callback) {
    //Get the documents collection
    const collection = db.collection('fruits');
    //Insert some document
    collection.insertMany([
        {
            name: "Apple",
            score: 8,
            review: "Great Fruits"
        },
        {
            name: "Orange",
            score: 6,
            review: "Kinda sour"
        },
        {
            name: "Banana",
            score: 9,
            review: "Great Stuff"
        }
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 Documents into the collections");
        callback(result);
    });
};

const findDocuments = function (db, callback) {
    //Get the documents collection
    const collection = db.collection('fruits')
    //FInd some documents
    collection.find({}).toArray(function(err, fruits){
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits)
        callback(fruits);
    });
}