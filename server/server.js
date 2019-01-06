var express = require('express');
var bodyParser = require('body-parser');


var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./db/models/todo.js');
var {User} = require('./db/models/user.js');


var app = express();

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
    console.log(req.body);
    var newTodo = new Todo({
            text: req.body.text
    });
    newTodo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});


app.listen(3000, () => {
    console.log('Started on port 3000')
});

// var newTodo = new Todo({
//     text: 'Go shopping',
//     completed: false,
//     completedAt: 1300
// });





// var newUser = new User({
//     email: 'svensura@germanscreens.de'
// });

// newUser.save().then((doc) => {
//     console.log('Saved user', doc);
// }, (e) => {
//     console.log('Unable to save user');
// });