import express from 'express';
import passport from "passport";
const router = express.Router();

const todoController = require('../controller/todoController');

router.post('/add', passport.authenticate("jwt"), todoController.addTodo);
router.get('/get', passport.authenticate("jwt"), todoController.getTodo);
router.delete('/delete/:_id', passport.authenticate("jwt"), todoController.deleteTodoTask);
router.get('/completed/task/:_id', passport.authenticate("jwt"), todoController.completedTodoTask);
router.get('/get/task/:_id', passport.authenticate("jwt"), todoController.getTaskData);
router.put('/update/task/:_id', passport.authenticate("jwt"), todoController.updateTaskData);

export default router;

