import express from "express";
import dotenv from "dotenv";
// const db = require("./config/Database.js");

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

// (async () => {
//     await db.authenticate();
// })();

app.listen(port, () => { console.log(`Server Run ${port}`) })