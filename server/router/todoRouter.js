import express from 'express';
const router = express.Router();

const todoController = require('../controller/todoController');

router.post('/add/:_id', todoController.addTodo);
router.get('/get/:_id', todoController.getTodo);
router.delete('/delete/:_id', todoController.deleteTodoTask);

export default router;

