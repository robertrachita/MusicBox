const express = require('express');
const fileUpload = require('express-fileupload');
const authController = require('../controllers/auth');
const fileuploadController = require('../controllers/fileupload');

const app = express();
app.use(fileUpload());

const router = express.Router();

router.post('/register', authController.register)

router.post('/login', authController.login );

router.get('/logout', authController.logout);

router.post('/upload', fileuploadController.uploadFile);

module.exports = router;
