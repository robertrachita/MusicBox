const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/',authController.isLoggedIn, (req,res)=> {
    res.render('index',{
        user: req.user
    });
});


router.get('/register',(req,res)=> {
    res.render('register');
});

router.get('/login',(req,res)=> {
    res.render('login');
});

<<<<<<< Updated upstream
router.get('/login2',(req,res)=> {
    res.render('login2');
=======
router.get('/index', (req, res) => {
    res.render('index');
>>>>>>> Stashed changes
});

router.get('/profile', authController.isLoggedIn, (req,res)=> {
   
    if(req.user){
        res.render('profile', {
            user: req.user
        });
    }
    else {
        res.redirect('/login');
    }

});

module.exports = router;

