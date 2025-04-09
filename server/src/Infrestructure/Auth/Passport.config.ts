import passport from "passport";
import { localStrategy } from "./Strategies/local.strategie";

const passportConfig = passport.use(localStrategy);

export default passportConfig;

