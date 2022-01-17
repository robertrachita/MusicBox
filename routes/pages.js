const express = require('express');
const authController = require('../controllers/auth');
const path = require('path');
const req = require('express/lib/request');
const router = express.Router();

const app = express();

router.get('/', authController.isLoggedIn, (req, res) => {
    res.render('login', {
        user: req.user
    });
});


router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/registration2', (req, res) => {
    res.render('registration2');
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('profile', {
            user: req.user
        });
    }
    else {
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

router.get('/index', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('index');
    } else {
        res.redirect('/login');
    }
});


router.get('/upload', express.static(path.join(__dirname, 'public/upload')));

module.exports = router;
