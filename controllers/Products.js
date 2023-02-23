import { Products } from "../models/ProductModel.js";

export const getProduct = async (req, res) => {
    try {
        const product = await Products.findAll()
        res.status(200).json({
            response: product
        });
    } catch (error) {
        res.status(404).json({ msg: error });
    }
}