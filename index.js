import express from "express";
import dotenv from "dotenv";
import db from "./config/Database.js";
// import Products from "./models/ProductModel.js";
import ProductRoute from "./router/ProductRoute.js"

dotenv.config();
const port = process.env.PORT || 4000;
const app = express();

try {
    await db.authenticate();
    console.log("Database Connected...");
    // await Products.sync();
} catch (error) {
    console.error(error);
}

app.use(express.json());
app.use(express.urlencoded());

app.use(ProductRoute);


app.listen(port, () => { console.log(`Server Run ${port}`) })