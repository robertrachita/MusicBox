const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login );

<<<<<<< Updated upstream
router.get('/logout',authController.logout);
    
=======
router.post('/index', authController.login);

>>>>>>> Stashed changes
module.exports = router;