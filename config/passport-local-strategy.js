const passport = require('passport');
var localStrategy = require('passport-local').Strategy;
const User = require('../models/users');
passport.use(new localStrategy({usernameField : 'email'},async (email,password,done) => {
  

    try{
        var user = await User.findOne({email : email});
        if (!user) {
            return done(null,false);

        }else{

            if (user.password !== password) {
                return done(null,false);
            }else{
                return done(null,user);
            }

        }

    }catch(err) {
        return done(err);

    }
  
    

  

}));

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser(async (id,done) => {

    try{
        var user = await User.findById(id);
        return done(null,user);

    }catch(err) {
        return done(null);

    }
  

})

passport.setAuthenticated = (req,res,next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;