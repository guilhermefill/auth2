const router = require('express').Router();
const bcrypt = require('bcryptjs');

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
    bcrypt.genSalt(saltRound)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => {
            return User.create({
                username,
                password: hash
            })
        })
        .then(() => { res.redirect('/') })
        .catch(error => console.log(error));
});

module.exports = router;