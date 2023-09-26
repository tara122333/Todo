const { UserModel, TaskModel } = require("../database/allModels");
import { ObjectId } from "mongoose";
exports.addTodo = async (req, res) => {
    try {
        const { _id } = req.params;
        const { task } = req.body;
        const user = await UserModel.findOne({ _id });
        if (!user) {
            return res.status(203).json({ message: "not found" });
        }
        const checkUserTask = await TaskModel.findOne({ user: _id });
        if (checkUserTask) {
            const updateTask = await TaskModel.findOneAndUpdate(
                {
                    user: _id,
                },
                {
                    $push: { task }
                },
                {
                    new: true
                }
            );
            return res.status(200).json({ message: "task added success", updateTask });
        }
        else {
            const createTask = {
                user: _id,
                task: task
            }
            const taskData = await TaskModel.create(createTask);
            return res.status(200).json({ message: "task added success", taskData });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getTodo = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await UserModel.findOne({ _id });
        if (!user) {
            return res.status(203).json({ message: "not found" });
        }
        const getUserTask = await TaskModel.findOne({ user: _id });
        if (getUserTask) {
            return res.status(200).json({ message: "all task", getUserTask });
        }
        return res.status(201).json({ message: "task not found" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.deleteTodoTask = async (req, res) => {
    try {
        const { _id } = req.params;
        const findUserTask = await TaskModel.findOne({ 'task._id': _id });
        await TaskModel.updateOne(
            {
                _id: findUserTask._id
            },
            {
                $pull: {
                    task: {
                        _id: _id
                    }
                }
            },
            {
                new: true
            }
        )
        return res.status(200).json({ message: "task delete success" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.completedTodoTask = async (req, res) => {
    try {
        const { _id } = req.params;
        const findUserTask = await TaskModel.findOne({ 'task._id': _id });
        for (let i = 0; i < findUserTask.task.length; i++) {
            if (_id === findUserTask.task[i]._id.toString()) {
                const newTask = {
                    name: findUserTask.task[i].name,
                    date: findUserTask.task[i].date,
                    time: findUserTask.task[i].time,
                    list: findUserTask.task[i].list,
                    status: true,
                    _id: findUserTask.task[i]._id
                }
                arr.push(newTask);
            }
            else {
                arr.push(findUserTask.task[i]);
            }
        }
        await TaskModel.updateOne(
            {
                'task._id': _id
            },
            {
                $set: {
                    task: arr
                }
            },
            {
                new: true
            }
        )
        return res.status(200).json({ message: "task completed!" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};