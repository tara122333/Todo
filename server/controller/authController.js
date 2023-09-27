import bcrypt from 'bcryptjs';
import transporter from '../config/config.mail';
import { ListModel, UserModel, UserVerificationModel } from "../database/allModels";

transporter.verify((error, success) => {
    if (error) {
        console.log("nodemailer verify error " + error);
    }
    else {
        console.log("Ready to send email");
        console.log("success " + success);
    }
});

const sendvarificationmail = ({ _id, email }, res) => {
    const currentUrl = "http://localhost:4000/";
    const uId = "4521354tara15120";
    const uniqueString = uId + _id;

    const mailOption = {
        from: process.env.AUTH_NODEMAILER_MAIL,
        to: email,
        subject: "Email Varification ToDo application",
        html: `<p>
        Email Varification <br>
        <a href=${currentUrl + "auth/verify/" + _id + "/" + uniqueString}>
        ${currentUrl + "auth/verify/" + _id + "/" + uniqueString}
        </a>
        </p>`
    };

    const saltRound = 8;
    bcrypt.hash(uniqueString, saltRound).then((hashUniqueString) => {
        const newVarification = new UserVerificationModel({
            userId: _id,
            uniqueString: hashUniqueString,
            createdAt: Date.now(),
            expireAt: Date.now() + 300000,
        });
        newVarification.save().then(() => {
            transporter.sendMail(mailOption).then(() => {
                console.log("mail sent and record save !!");
            }).catch((error) => {
                console.log("mail sent error" + error);
                res.status(501).json({ Error: error.message });
            });
        }).catch((error) => {
            res.status(501).json({ Error: error.message });
        })
    }).catch((error) => {
        res.status(501).json({ Error: error.message });
    })
}


exports.signIn = async (req, res) => {
    try {
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        if (!user) {
            return res.status(203).json({
                status: "success", message: "user not found",
            });
        }
        if (user.verified) {
            const token = user.generateAuthToken();
            return res.status(200).json({
                token, user, status: "success", message: "signin successfully",
            });
        }
        else {
            return res.status(202).json({
                status: "user not verified"
            });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


exports.signUp = async (req, res) => {
    try {
        const userData = await UserModel.findByEmail(req.body.credentials);
        if (userData) {
            if (userData.verified) {
                return res.status(200).json({
                    message: "user already exist and verified", status: "success"
                });
            }
            else {
                await UserVerificationModel.findOneAndDelete({ userId: userData._id });
                sendvarificationmail(userData);
                return res.status(200).json({
                    message: "user already exist and Not verified", status: "success"
                });
            }
        }
        else {
            const newUser = await UserModel.create(req.body.credentials);
            console.log(newUser);
            const defaultUserList = {
                user: newUser._id,
                list: ["default", "work", "personal"]
            }
            const userList = await ListModel.create(defaultUserList);
            const token = newUser.generateAuthToken();
            sendvarificationmail(newUser)
            return res.status(200).json({
                userList, token, message: "user added successfully", status: "success"
            });
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { userId, uniqueString } = req.params;
        const result = await UserVerificationModel.findOne({ userId });
        if (result) {
            const { expireAt } = result;
            const hashUniqueString = result.uniqueString;
            if (expireAt < Date.now()) {
                await UserVerificationModel.deleteOne({ userId });
                await UserModel.deleteOne({ _id: userId });
                return res.status(202).json({ message: "user database has been cleaning" });
            }
            else {
                const validString = await bcrypt.compare(uniqueString, hashUniqueString);
                if (validString) {
                    await UserModel.updateOne({ _id: userId }, { verified: true }, { new: true });
                    console.log("user successfully verified");
                    return res.status(200).json({ message: "user successfully verified" });
                }
                else {
                    console.log("user uniqueString not matches");
                    return res.status(204).json({ message: "user uniqueString not matches" });
                }
            }
        }
        return res.status(203).json({ Error: error.message, message: "data has been don't exist or Invalid " });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


