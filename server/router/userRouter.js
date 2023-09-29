import express from 'express';
import passport from 'passport';
const router = express.Router();

const userController = require('../controller/userController');

router.get('/',passport.authenticate("jwt"), userController.getUserDetails);

export default router;

