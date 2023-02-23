import express from "express";
import { getProduct } from "../controllers/Products.js";

const router = express.Router();

router.get("/product", getProduct);

export default router;