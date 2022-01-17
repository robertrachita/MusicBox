const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');

const app = express();

const server = require('https').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});
const { v4: uuidV4 } = require('uuid')

dotenv.config({ path: './.env' });



app.use('/peerjs', peerServer);

const db = mysql.createConnection({
    //In order to run on the server instead of localhost
    //use ip adress of it 
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies(as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'hbs');

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("MYSQL Connected...")
    }
})

//Define Rountes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId);
        // messages
        socket.on('message', (message) => {
            //send message to the same room
            io.to(roomId).emit('createMessage', message)
        });

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}
app.listen(port, () => {
    console.log("Server started on Port " + port);
})