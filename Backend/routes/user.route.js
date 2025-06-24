import {Router} from "express"
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
router.get("/logout", userController.Logout);

export default router;