//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server');
    const db = client.db('TodoApp');


   
    // update
    db.collection('Users').findOneAndUpdate({name: 'Hans'},{
        $set: {
            name: 'Sven'
            },
        $inc: {
            age: 1 }
        },{
            returnOriginal: false
        }
    ).then((result) => {
        console.log(result);
        });

    //client.close();
});