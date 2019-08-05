var mongoose = require('mongoose');

// mongoose.connect('mongodb://admin:Abc123_@localhost:27017/app',{useNewUrlParser:true});
mongoose.connect('mongodb://admin:Abc123_@127.0.0.1:27017/app?authSource=admin',{useNewUrlParser:true});

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connected error'));
db.once('open',function(){
    console.log('connected!!')
})



module.exports = mongoose;

