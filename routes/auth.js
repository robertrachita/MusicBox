const express = require('express');
const multer = require('multer');

const fs = require('fs');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = 'public/upload'
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});
const upload = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
        console.log(file.mimetype);
        if (file.mimetype == "application/xml" || file.mimetype == "text/xml" || file.mimetype == "application/octet-stream") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .xml format allowed!'));
        }
    }
});
const authController = require('../controllers/auth');
const uploadController = require('../controllers/upload');

const router = express.Router();

router.post('/register', authController.register)

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.post('/upload', upload.single('file'), uploadController.upload);

module.exports = router;