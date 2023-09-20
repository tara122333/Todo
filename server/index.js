require("dotenv").config();
require("./database/connection");


// Library
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
const session = require('express-session')

// imports my modules

// import configs
// import googleAuthConfig from "./config/google.config"; // google AuthConfig
// import routeConfig from './config/route.config';




// DB
// import MongoDb from './database/connection';

// importing microservices route
// import Auth from './API/auth';

const App = express();



App.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla'
}));



// Application middleware
App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(helmet());
App.use(cors());
App.use(passport.initialize());
App.use(passport.session());



// passpoer configuration
// googleAuthConfig(passport);
// routeConfig(passport);


// Application Route
// Zomato.use('/auth', Auth);


App.get("/", (req, res) => {
    res.json({ message: "Success" });
});



//server listening
App.listen(4000, () => {
    console.log("server started at port 4000");
});