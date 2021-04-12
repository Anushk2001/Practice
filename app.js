const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

//DB Configue
const db = require('./config/keys').MongoURI;

//Connecting to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

// EJS 
app.use(expressLayouts);
app.set('view engine','ejs');

// Bodyparser
app.use(express.urlencoded({extended: false}));


// Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/user'));

const PORT = process.env.port || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));
