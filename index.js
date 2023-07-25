const express = require('express');
require('dotenv').config();
require('./config/mongoose');
const app = express();
const port = 8000 || process.env.port;
const passport = require('passport');
require('./config/passport-local-strategy');
const session = require('express-session');
var mongo_store = require('connect-mongo');
app.use(express.urlencoded());
const express_ejs_layout = require('express-ejs-layouts');


app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./assets'));
app.use(express_ejs_layout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


app.use(session({
    name : 'e-commerce',
    secret : 'e-commerce93',
    cookie : {
        maxAge : (60 * 60 * 24 * 1000)
    },
    store : mongo_store.create({mongoUrl : process.env.MongodbUrl})
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticated);

app.use('/',require('./routes/index'));

app.listen(port,(err) => {
    if (err) {
        console.log("error occuring while initaiting server",err);
        return;
    }

    console.log("server running on port ",port);
})
