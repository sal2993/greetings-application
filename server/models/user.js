var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var bcrypt = require('bcrypt');
//var SALT_WORK_FACTOR = 10;

var UserSchema = new Schema(
    {
        username: {type:String, required: true, index: { unique : true},  max:15},
        password: {type:String, required: true, max:30}
    }
);

module.exports = mongoose.model("User", UserSchema);