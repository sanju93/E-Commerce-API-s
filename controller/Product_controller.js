// database models
const Product = require('../models/products');
const User = require('../models/users');

//1. add product
module.exports.addProduct = async (req,res) => {
    try{
        var product =  await Product.create({
            product_name : req.body.product_name,
            user : req.user._id,
            Quantity : req.body.quantity
         })
         try{

            var user = await User.findById(req.user._id);
            user.products.push(product._id);
            user.save();
            return res.redirect(200,'back');

         }catch(err) {

            console.log("Error while updating the user database",err);
            return res.redirect(500,'back')

         }
    }catch(err) {
        console.log("Error occuring while creating the database",err);
        return res.redirect(500,'back');


    }
}
// 2. get Products
module.exports.getProducts = async (req,res) => {
   
    var products = await Product.find({});
    return res.status(200).json(products);
}


//3. Delete product
module.exports.deleteProducts = async (req,res) => {
    try{
          var product = await Product.findById(req.params.id);
          var user_id = product.user;
          try{
               var user =  await User.findById(user_id);
              var index = user.products.indexOf(product._id);
              user.products.splice(index,1);
              user.save();
          }catch(err) {
            console.log("deleting the product from the user db",err);
            return res.status(500).json({message : "problem in database"});

          }
          await Product.findByIdAndDelete(req.params.id);
          var data = {};
          data.message = "product deleted";
        
          return res.status(200).json(data);
    }catch(err) { 

        console.log("error in product db",err);
        return res.status(500).json({message : "problem in database"});

    }
}

//4. Update Product

module.exports.updateQuantity = async (req,res) => {
    try{
        var product = await Product.findByIdAndUpdate(req.params.id,{Quantity: req.query.number});
        var data = {};
        data.product = {};
        data.product.id = product._id;
        data.product.name = product.product_name;
        data.product.quantity = product.Quantity;
        data.message = "Quantity updated successfully";
        return res.status(200).json(data);
       

    }catch(err) {

        console.log("error in updating the quantity",err);
        return res.status(500).json({message : "error in db"});

    }
   
}