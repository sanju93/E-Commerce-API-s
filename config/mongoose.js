const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/E-Commerce')
.then(
    () => {
        console.log("Database connected successfully");
    },
    (err) => {
        console.log("Error occuring while connecting database",err);
    }
)