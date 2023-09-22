const { ListModel } = require("../database/list");


exports.getList = async (req, res) => {
    try {
        const { _id } = req.params;
        const findUserList = await ListModel.findOne({ user: _id });
        if (findUserList) {
            return res.status(200).json({ findUserList });
        }
        return res.status(202).json({ message: "user list not found!!" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.addList = async (req, res) => {
    try {
        const { _id } = req.params;
        const { list } = req.body;
        const updateUserList = await ListModel.findOneAndUpdate(
            {
                user: _id
            },
            {
                $push: { list }
            },
            {
                new: true
            }
        );
        if (updateUserList) {
            return res.status(200).json({ updateUserList });
        }
        return res.status(202).json({ message: "user list not update!!" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};