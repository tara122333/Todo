require("dotenv").config();
require("./database/connection");


// Library
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import session from 'express-session';

// imports my modules
import auth from './router/authRouter';
import user from './router/userRouter';
import todo from './router/todoRouter';
import list from './router/listRouter'

// import configs
import googleAuthConfig from "./config/config.goolge"; // google AuthConfig
// import routeConfig from './config/route.config';



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
googleAuthConfig(passport);
// routeConfig(passport);


// Application Route
App.use('/auth', auth);
App.use('/user', user);
App.use('/todo', todo);
App.use('/list', list);

App.get("/", (req, res) => {
    res.status(200).json({ message: "Success" });
});



//server listening
App.listen(4000, () => {
    console.log("server started at port 4000");
});