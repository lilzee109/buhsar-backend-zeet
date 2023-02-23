import express from "express";
import { createUsers, login, auth, logout } from "../controllers/Users.js";

const router = express.Router();

router.post("/users", createUsers);
router.post("/login", login);
router.get("/auth", auth);
router.delete("/logout", logout);

export default router;