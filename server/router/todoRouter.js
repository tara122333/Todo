import express from 'express';
const router = express.Router();

const todoController = require('../controller/todoController');

router.post('/add/:_id', todoController.addTodo);

export default router;

