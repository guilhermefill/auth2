const router = require('express').Router();

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/welcome', (req, res) => {
    const user = req.session.currentUser;
    if (!user) {
        res.redirect('/auth/login');
    }
    res.render('user/welcome', { user })
});

module.exports = router;