import {Router} from "express"
import captainController from "../controllers/captain.controller.js";

const router = Router();

router.post("/signup", captainController.Signup);
router.post("/login", captainController.Login);
router.get("/logout", captainController.Logout);

export default router;