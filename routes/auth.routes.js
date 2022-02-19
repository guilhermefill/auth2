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
                res.status(500).render('auth/signup', { errorMessage: error.message })
            } else if (error.code === 11000) {
                res.status(500).render('auth/signup', { errorMessage: 'This username is already taken' })
            }
        });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'User not found' });
                return
            } else if (bcrypt.compareSync(password, user.password)) {
                req.session.currentUser = user;
                res.redirect('/welcome');
            } else {
                res.render('auth/login', { errorMessage: 'Incorrect credentials' });
            }
        })
        .catch(error => console.log(error));
});

module.exports = router;