import express from "express";
import { Register, Login, refreshToken, logout } from "../controllers/UserController.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

export default router;
