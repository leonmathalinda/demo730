const mongoose = require('../config/db');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    id:String,
    password:String,
    name:String,
    age:Number,
    address:String
});


module.exports = mongoose.model("user",UserSchema);


