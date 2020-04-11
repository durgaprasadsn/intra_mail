// dependencies 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const users = require('./api/routes/users');
const mails = require('./api/routes/mails');

require('dotenv').config();

// init express 
const server = express();
const port = process.env.PORT;
const mongo_uri = process.env.DB_CONNECTION;
const connection = mongoose.connection;

// connecting to mongoDB
mongoose.connect(mongo_uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex : true,
    useFindAndModify : false
});

// checking if connection established
connection.once('open', () => {
    console.log('Connection Established with Mongo Atlas');
});

// middleware to handle cors
server.use(cors());

// parsing the message body
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

// route application
server.use('/users', users);
server.use('/mails', mails);


// Listening on port 8080
server.listen(port,() => {
    console.log(`Listening on port: ${port}...`);
});
