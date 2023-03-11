const express = require('express');
const app = express();
const port = 8000;
const express_ejs_layout = require('express-ejs-layouts');


app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./assets'));
app.use(express_ejs_layout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes/index'));

app.listen(port,(err) => {
    if (err) {
        console.log("error occuring while initaiting server",err);
        return;
    }

    console.log("server running on port ",port);
})