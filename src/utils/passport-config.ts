import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";
import { User } from "../models/User";

export const passportConfig = () => {
  const secretKey = process.env.SECRET_KEY ?? "secret";
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secretKey,
      },
      async (jwt_payload: any, done: any) => {
        const user = await User.findByPk(jwt_payload.userId);
        if (!user) return done("invalid token", false);
        return done(null, user);
      }
    )
  );
};
