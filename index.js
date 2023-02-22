import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js"

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

try {
    await db.authenticate();
    console.log("Database Connected...");
} catch (error) {
    console.error(error);
}


app.listen(port, () => { console.log(`Server Run ${port}`) })