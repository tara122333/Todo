require("dotenv").config();
import nodemail from 'nodemailer';

let transporter = nodemail.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: process.env.AUTH_NODEMAILER_MAIL,
        pass: process.env.AUTH_NODEMAILER_PASS,
    }
});

export default transporter;