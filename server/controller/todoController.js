const { UserModel, TaskModel } = require("../database/allModels");

exports.addTodo = async (req, res) => {
    try {
        const { _id } = req.params;
        const { task } = req.body;
        console.log("task");
        console.log(task);
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