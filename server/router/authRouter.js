import express from 'express';
const router = express.Router();

const authController = require('../controller/authController');

router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);
router.get('/verify/:userId/:uniqueString', authController.verifyEmail);

export default router;

