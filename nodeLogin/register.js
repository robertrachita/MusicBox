//Requiring the neccesarry modules to run
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

//Connecting to db
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'musicdate'
});

//Initialising express
var app = express();

//Letting express know we will use some of its packages
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//Displaying the register page 
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/register.html'));
});

//Posting the username and password to the server, 
app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
    var passwordRedo = request.body.passwordRedo;
    if(password!=passwordRedo)
    {
        response.send('The redo password does not match the original one!');
    } 
    else if (username && password) {
        connection.query('SELECT * FROM users WHERE email = ?',[username], function(error, results, fields) {
            if(results.length > 0)
            {
                response.send('This email has already registered');
                response.end();
            } 
        });
		connection.query(`INSERT INTO users (email,first_name, last_name,password) VALUES (${username},${'Pedal'},${'Pedal2'},${password})`,function(error, results, fields)      
         {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
    response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

//If the registering was good we redirect to home
app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome, ' + request.session.username + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);

//To start type cd nodelogin and then node register.js