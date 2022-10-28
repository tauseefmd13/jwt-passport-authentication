import { Router } from "express";
import * as UserController from "../controllers/UserController.js";

const router = Router();

router.get("/me/", UserController.me);

export default router;
