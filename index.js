import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UsersRoute from "./router/UsersRoute.js";
dotenv.config();

const app = express();
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: "auto"
    }
}))

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000"]
}));
app.use(express.json());
app.use(UsersRoute);

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server Run ${process.env.PORT}`)
});