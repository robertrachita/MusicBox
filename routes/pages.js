const express = require('express');
const authController = require('../controllers/auth');
const path = require('path');
const req = require('express/lib/request');
const roomController = require("../controllers/room");
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


router.get('/profile', authController.isLoggedIn, (req, res) => {
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

router.get('/musicsheets', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('musicsheets');
    } else {
        res.redirect('/login');
    }
});

router.get('/metronomeFrontEnd', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('metronomeFrontEnd');
    } else {
        res.redirect('/login');
    }
});

router.get('/settings', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('settings');
    } else {
        res.redirect('/login');
    }
});

router.get('/view_uploads', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('view_uploads');
    } else {
        res.redirect('/login');
    }
});

router.get('/view_rooms', authController.isLoggedIn, (req, res) => {
    if (req.user) {
        res.render('view_rooms', {
            rooms: roomController.getRooms
        });
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

//router.get('/upload', express.static(path.join(__dirname, 'public/upload')));

module.exports = router;