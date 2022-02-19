const router = require('express').Router();

const isLoggedIn = (req, res, next) => {
    if(!req.session.currentUser) {
        res.redirect('auth/login');
    } else {
        next();
    }
};

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/welcome', isLoggedIn,  (req, res) => {
    const user = req.session.currentUser;
    res.render('user/welcome', { user })
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) {
            console.log(error);
        } else {
            res.redirect('auth/login');
        }
    });
});

module.exports = router;