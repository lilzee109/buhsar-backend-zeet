import express from "express";
import { createUsers } from "../controllers/Users.js"

const router = express.Router();

router.post("/register", createUsers);

export default router;
