const express = require('express');
const multer = require('multer');
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `upload/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});
const upload = multer({
    storage: multerStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/xml" || file.mimetype == "text/xml") {
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

// router.post('/registration2',authController.updateProfile)

router.post('/register', authController.register)

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.post('/upload', upload.single('file'), uploadController.upload);

module.exports = router;