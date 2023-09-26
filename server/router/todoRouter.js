import express from 'express';
const router = express.Router();

const todoController = require('../controller/todoController');

router.post('/add/:_id', todoController.addTodo);
router.get('/get/:_id', todoController.getTodo);
router.delete('/delete/:_id', todoController.deleteTodoTask);
router.put('/completed/task/:_id', todoController.completedTodoTask);

export default router;

