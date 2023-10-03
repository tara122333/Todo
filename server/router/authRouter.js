import express from 'express';
import passport from 'passport';
const router = express.Router();

const authController = require('../controller/authController');

router.post('/signin', authController.signIn);
router.post('/signup', authController.signUp);
router.get('/verify/:userId/:uniqueString', authController.verifyEmail);

router.get("/google", passport.authenticate("google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
    ]
}));

router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        // return res.redirect(
        //     `http://localhost:3000/google/${req.session.passport.user.token}`
        // );
        return res.redirect(
            `https://todo-tau-liart-43.vercel.app/google/${req.session.passport.user.token}`
        );
    }
);

export default router;

