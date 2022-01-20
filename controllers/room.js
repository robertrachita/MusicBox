const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {promisify} = require('util');

const db = mysql.createConnection({
    //In order to run on the server instead of localhost
    //use ip adress of it
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.createRoom = async (req, res) => {
    try {
        const {roomID} = req.body;

        if (!roomID) {
            return res.status(400).render('view_uploads');
        }

        db.query('INSERT INTO rooms SET ? ', {room_id: roomID}, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('view_rooms');
            }
        })
    } catch (e) {
        console.log(e);
    }
}