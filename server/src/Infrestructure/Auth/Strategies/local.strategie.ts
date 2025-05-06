import EnterpriseModel from "../../Db/Models/Enterprise";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

const newStrategyJwt: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "secret",
};

export const localStrategy = new Strategy(newStrategyJwt, async (payload, done) => {
  try {
    const enterprise = await EnterpriseModel.findById(payload.id);
    if (!enterprise) return done(null, false);
    return done(null, enterprise);
  } catch (error) {
    return done(error, false);
  }
});
