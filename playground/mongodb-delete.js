//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('connected to MongoDB server');
    const db = client.db('TodoApp');

    // delete many
    // db.collection('Users').deleteMany({name: 'Sven'}).then((result) => {
    //     console.log(result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //  console.log(result);
    // });
    
    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });
   
    // findOneAndDelete by ID
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5c30f6f0d79378a66d32c88f')}).then((result) => {
        console.log(result);
    });

    //client.close();
});