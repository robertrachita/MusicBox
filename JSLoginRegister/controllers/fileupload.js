const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.uploadFile = async (req, res) => {
    let file;
    let uploadPath;

    if (req.cookies.jwt) {
        try {
            console.log(req.files);
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded');
            }

            const decoded = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET
            );

            file = req.files.file;
            uploadPath = __dirname + '../uploads/' + decoded.id + '/' + file.name;

            file.mv(uploadPath, function (err) {
                if (err)
                    return res.status(500).send(err);

                res.send('File uploaded!');
            });
        } catch (error) {
            console.log(error);
        };
    }
}
