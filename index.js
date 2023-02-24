import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
import { Products } from "./models/ProductModel.js";
import { Users } from "./models/UsersModel.js";
import ProductRoute from "./router/ProductRoute.js";
import UsersRoute from "./router/UsersRoute.js";
import session from "express-session";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

try {
    await db.authenticate();
    console.log("Database Connected...");
    await Products.sync();
    await Users.sync();
} catch (error) {
    console.error(error);
}

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: "auto", httpOnly: true }
}))

app.use(cors({ credentials: true, origin: ["http://localhost:3000", "https://safaaat.github.io"] }));
app.use(express.json());
app.use(express.urlencoded());

app.use(ProductRoute);
app.use(UsersRoute);


app.listen(port, () => { console.log(`Server Run ${port}`) })