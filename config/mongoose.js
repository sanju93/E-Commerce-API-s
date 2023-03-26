const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MongodbUrl)
.then(
    () => {
        console.log("Database connected successfully");
    },
    (err) => {
        console.log("Error occuring while connecting database",err);
    }
)