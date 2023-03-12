const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    product_name : {
        type : String,
        require : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    Quantity : {
        type : Number,
        require : true
    }
},{timestamps : true});

const Product = mongoose.model('Product',productSchema);
module.exports = Product;