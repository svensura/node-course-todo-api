const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {User} = require('./../server/models/user.js');

Todo.findByIdAndDelete('5c3a06e0c1d5ee741beaaa6b').then((result) => {
    console.log(result);
});

Todo.findOneAndDelete({id_: '5c3a06e0c1d5ee741beaaa6b'}).then((result) => {
    console.log(result);
});