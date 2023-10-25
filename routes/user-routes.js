import express from "express";
import { getAllUsers, login, signUp } from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", signUp);
router.post("/login", login);
export default router;
