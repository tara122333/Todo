import JwtPassport from "passport-jwt";
import { UserModel } from "../database/allModels";
import dotenv from "dotenv";
// dotenv.config({
//     path: require("path").resolve(__dirname, "../.env"),
// });

const JWTStratergy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'user';

export default (passport) => {
    passport.use(
        new JWTStratergy(opts, async (jwt__payload /* it is data */, done) => {
            try {
                const doesUserExist = await UserModel.findById(jwt__payload.user);
                if (!doesUserExist) return done(null, false);
                return done(null, doesUserExist);
            } catch (error) {
                console.log("errro");
                throw new Error(error);
            }
        })
    );
};