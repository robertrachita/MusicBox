const express = require('express');
const authController = require('../controllers/auth');
const path = require('path');
const router = express.Router();



const app = express();


router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('index', {
        user: req.user
    });
});


router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});


router.get('/index', (req, res) => {
    res.render('index');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {


    router.get('/login2', (req, res) => {
        res.render('login2');
    });

    router.get('/profile', authController.isLoggedIn, (req, res) => {
        developing
        if (req.user) {
            res.render('profile', {
                user: req.user
            });
        } else {
            res.redirect('/login');
        }

    });

    router.get('/upload', authController.isLoggedIn, (req, res) => {
        if (req.user) {
            res.render('upload');
        } else {
            res.redirect('/login');
        }
    });

    module.exports = router;

    router.get('/upload', express.static(path.join(__dirname, 'public/upload')));

});