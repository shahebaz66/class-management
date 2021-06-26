const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-shahebaz:admin123@shahebaz.r8yb8.mongodb.net/example?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => { console.log("db connected"); });



module.exports.Class=require('./classes');
module.exports.User=require('./user');