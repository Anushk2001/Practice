const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport Config
require('./config/passport')(passport);

//DB Configue
const db = require('./config/keys').MongoURI;

//Connecting to Mongo
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
// .then(console.log('DB Connected'))
// .catch((err)=>console.log(err));

// EJS 
app.use(expressLayouts);
app.set('view engine','ejs');

// Bodyparser
app.use(express.urlencoded({extended: false}));

//Express Session 
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

// Passport middleware(we have to put it, after express session)
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

//this shoul be below the app.use(flash())
// Global variables (green for success , yellow for error,etc..)
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


// Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/user'));


const PORT = process.env.port || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));
