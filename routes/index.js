import { Router } from "express";
import passport from "passport";

import AuthRoutes from "./AuthRoutes.js";
import UserRoutes from "./UserRoutes.js";

const router = Router();
const auth = passport.authenticate("jwt", { session: false });

router.use("/auth", AuthRoutes);
router.use("/users", auth, UserRoutes);

export default router;
