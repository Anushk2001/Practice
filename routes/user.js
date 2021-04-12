const express = require('express');

const router = express.Router();

// Login page
router.get('/login',(req,res) => (res.render("login")));

// Register page
router.get('/register',(req,res) => (res.render("register")));

// Register Handle
router.post('/register',(req,res)=>{
    // console.log(req.body);
    // res.send('Hello');
    const {name, email, password, password2} = req.body;

    let errors = [];


    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
      }
    
      if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
      }
    
      if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
      }
      // if errors
      if (errors.length > 0) {
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      }
      else
      {
          res.send("Pass");
      }
});

module.exports = router;