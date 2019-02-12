require('./config/config');



const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate.js');


var app = express();

// Port set for HEROKU deployment or local testing
const port = process.env.PORT;

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

app.patch('/todos/:id', (req, res) => {
   var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    } 
    
    Todo.findOneAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
        }).catch((e) => res.status(400).send());
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var newUser = new User(body); 
    // instead of
    // var newUser = new User({
    //         email: body.email,
    //         password: body.password
    // });
    newUser.save().then(() => {
        return newUser.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(newUser);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    })
});


app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    })
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
// }