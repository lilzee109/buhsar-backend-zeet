import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UsersRoute from "./router/UsersRoute.js";
import db from "./config/Database.js";
dotenv.config();

const port = process.env.PORT || 4000;
const app = express();

try {
    await db.authenticate();
    console.log("Database Connected...");
    await db.sync();
} catch (error) {
    console.error(error);
}

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://lilzee109.github.io"]
}));

app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: "auto"
    }
}))
app.use(express.json());
app.use(UsersRoute);

app.listen(port, () => {
    console.log(`Server Run ${port}`)
});