import { type Request, type Response } from "express";
import * as queries from "../db/queries";

import { getAuth } from "@clerk/express";

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await queries.getAllProducts();
        res.status(200).json(products);
    }
    catch (error) {
        console.log("error fetching products", error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getMyProducts = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        const userProducts = await queries.getProductsByUserId(userId);
        res.status(200).json(userProducts);
    }
    catch (error) {
        console.log("error fetching user products", error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (typeof id !== "string") {
            return res.status(400).json({ error: "Invalid product ID" });
        }
        const product = await queries.getProductById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.log("error fetching product", error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        const { title, description, imageUrl } = req.body;
        if (typeof title !== "string" || typeof description !== "string" || typeof imageUrl !== "string") {
            return res.status(400).json({ error: "Invalid request body" })
        }

        const newProduct = await queries.createProduct({
            userId,
            title,
            description,
            imageUrl
        });

        res.status(200).json(newProduct);
    }
    catch (error) {
        console.log("error creating product", error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        const { id } = req.params
        const { title, description, imageUrl } = req.body;

        if (typeof id !== "string") {
            return res.status(400).json({ error: "Invalid product ID" })
        }

        const exsitingProduct = await queries.getProductById(id);

        if (!exsitingProduct) {
            return res.status(404).json({ error: "Product not found" })
        }

        if (exsitingProduct.userId !== userId) {
            return res.status(403).json({ error: "You can only update your products" })
        }

        const product = await queries.updateProduct(id, { title, description, imageUrl });

        res.status(200).json(product);

    }
    catch (error) {
        console.log("error updating product", error);
        res.status(500).json({ error: "Internal server error" })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" })
        }

        const { id } = req.params

        if (typeof id !== "string") {
            return res.status(400).json({ error: "Invalid product ID" })
        }

        const exsitingProduct = await queries.getProductById(id);

        if (!exsitingProduct) {
            return res.status(404).json({ error: "Product not found" })
        }

        if (exsitingProduct.userId !== userId) {
            return res.status(403).json({ error: "You can only delete your products" })
        }

        const product = await queries.deleteProduct(id);

        res.status(200).json(product);

    }
    catch (error) {
        console.log("error deleting product", error);
        res.status(500).json({ error: "Internal server error" })
    }
}
