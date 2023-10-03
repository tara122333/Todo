// Libraries
// import dotenv from "dotenv";
import googleAuth from 'passport-google-oauth20';
import { ListModel, UserModel } from '../database/allModels';

const GoogleStrategy = googleAuth.Strategy;

export default (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `https://todo-7z9f.onrender.com/auth/google/callback`,
    },
        async (accessToken, refreshToken, profile, done) => {
            const newUser = {
                fullname: profile.displayName,
                email: profile.emails[0].value,
                verified: true,
            };
            try {
                const user = await UserModel.findOne({ email: newUser.email });
                if (user) {
                    const token = user.generateAuthToken();
                    done(null, { user, token });
                }
                else {
                    const user = await UserModel.create(newUser);
                    const defaultUserList = {
                        user: user._id,
                        list: ["default", "work", "personal"]
                    }
                    const userList = await ListModel.create(defaultUserList);
                    const token = user.generateAuthToken();
                    done(null, { user, userList, token });
                }

            } catch (error) {
                done(error, null);
            }

        }
    )
    );
    passport.serializeUser((userData, done) => done(null, { ...userData }));
    passport.deserializeUser((id, done) => done(null, id));
};