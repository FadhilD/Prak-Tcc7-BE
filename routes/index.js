import express from "express";
import NoteRoute from "./NoteRoute.js";
import UserRoute from "./UserRoute.js";

const router = express.Router();

router.use(NoteRoute);
router.use(UserRoute);

export default router;
