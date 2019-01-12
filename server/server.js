var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');


var app = express();

// Port set for HEROKU deployment or local testing
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos})
    }, (e) => {
        res.status(400).send(e);
    })
});

app.get('/todos/:id', (req, res) => {
 var id = req.params.id;
 if (!ObjectID.isValid(id)) {
    return res.status(404).send();
 }
 Todo.findById(id).then((todo) => {
    if (!todo) {
        return res.status(404).send();
    }
    res.send({todo});
    }).catch((e) => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
       return res.status(404).send();
    }
    Todo.findByIdAndDelete(id).then((todo) => {
       if (!todo) {
           return res.status(404).send();
       }
       res.status(200).send({todo});
       }).catch((e) => res.status(400).send());
   });

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {
    app
};

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