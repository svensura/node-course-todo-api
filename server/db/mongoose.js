var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// for HEROKU mongDB addon and deployment or local testing
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true });

module.exports = {
    mongoose
};