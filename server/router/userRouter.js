import express from 'express';
const router = express.Router();

const userController = require('../controller/userController');

router.get('/:_id', userController.getUserDetails);

export default router;

