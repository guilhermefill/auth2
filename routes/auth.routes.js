const router = require('express').Router();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = require('../models/User.model')

const saltRound = 10;

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    // if(!username.length || !password.length) {
    //     res.render('auth/signup', {
    //         errorMessage: 'Please provide username and password.'
    //     });
    //     return
    // };
    bcrypt.genSalt(saltRound)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
            return User.create({
                username,
                password: hash
            })
        })
        .then(() => { res.redirect('/') })
        .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
                res.status(500).render('auth/signup', {errorMessage: error.message})
            } else if (error.code === 11000){
                res.status(500).render('auth/signup', {errorMessage: 'This username is already taken'})
            }
        });
});

module.exports = router;