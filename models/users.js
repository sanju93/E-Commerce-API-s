const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true

    },
    email : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    confirm_password : {
        type : String,
        require : true
    },
    products : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product'
        }]
    
},{timestamps : true});

const User = mongoose.model('User',userSchema);
module.exports = User;