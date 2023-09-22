import express from 'express';
const router = express.Router();

const listController = require('../controller/listController');

router.post('/add/:_id', listController.addList);
router.get('/get/:_id', listController.getList);

export default router;

