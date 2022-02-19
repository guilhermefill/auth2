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

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) {
            console.log(error);
        } else {
            res.redirect('auth/login');
        }
    });
})

module.exports = router;