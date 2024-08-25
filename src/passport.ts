import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { UserService } from "./services";

export async function authenticate() {
    const params = {
        secretOrKey: "secret",
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    };

    const strategy = new Strategy(params, async (payload, done) => {
        try {
            const user = await UserService.findById(payload.id);

            if (user) {
                done(null, {
                    ...payload
                });
            } else {
                done(null, false);
            }
        } catch (error) {
            done(error, false);
        }
    });

    passport.use(strategy);

    return passport.authenticate("jwt", { session: false })
}
