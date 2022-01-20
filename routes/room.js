const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const roomController = require('../controllers/room');

router.post('/createroom', authController.isLoggedIn, roomController.createRoom);

module.exports = router;