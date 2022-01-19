const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const db = mysql.createConnection({
    //In order to run on the server instead of localhost
    //use ip adress of it 
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.upload = async (req, res,) => {
    if (req.cookies.jwt) {
        try {
            console.log(req.file);
            if (!req.file || req.file === undefined) {
                return res.status(400).send('No files were uploaded');
            }

            const decoded = await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET
            );

            db.query('INSERT INTO music_sheets SET ? ', { user_id: decoded.id, file_path: req.file.filename }, (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(results);
                    return res.status(200);
                }
            })
        } catch (error) {
            console.log(error);
        };
    }
}