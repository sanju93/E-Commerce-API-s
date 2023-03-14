
// user db
const User = require('../models/users');

// signin page
module.exports.signIn = (req,res) => {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signin');
}

//signup page
module.exports.signup = (req,res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signup');
}

//profile page
module.exports.profile = (req,res) => {
    if (req.isAuthenticated()) {
        return res.render('profile');
    }else{
        return res.redirect('/users/signin');
    }
  
}

module.exports.signInPost = (req,res) => {

    return res.redirect('/users/profile');

}
// creating the user
module.exports.signUpPost = async (req,res) => {

    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    try{

        var user = await User.findOne({email : req.body.email});
        if (user) {
            
             return res.redirect('/users/signin');
    
        }else{
            try{

                await User.create({
                    name : req.body.name,
                    email : req.body.email,
                    password : req.body.password,
                    confirm_password : req.body.confirm_password
                })
                return res.redirect(200,'/users/signin');

            }catch(err) {

                console.log("error in creating database",err);
                return res.redirect('back');

            }
        }

    }catch(err) {

        console.log("error in fetching data from data base",err);
        return res.redirect('back');

    }





}


// logout the user
module.exports.logout = (req,res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return;
        }
    });

    return res.redirect('/users/signin');
}