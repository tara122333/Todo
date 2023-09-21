const { UserModel } = require("../database/user");

exports.getUserDetails = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await UserModel.findOne({ _id });
        if(!user){
            return res.status(203).json({message : "not found"});
        }
        if (user.verified) {
            res.status(200).json({
                user : user.fullname, status: "success"
            });
        }
        else {
            res.status(202).json({
                status: "user not verified"
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};