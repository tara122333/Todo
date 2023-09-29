import express from 'express';
import passport from 'passport';
const router = express.Router();

const listController = require('../controller/listController');

router.post('/add',passport.authenticate("jwt"), listController.addList);
router.get('/get',passport.authenticate("jwt"), listController.getList);

export default router;
