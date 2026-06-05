import { type Request, type Response } from "express";
import * as queries from "../db/queries";

import { getAuth } from "@clerk/express";

export const createComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { productId } = req.params;
        const { content } = req.body;

        if (typeof content !== "string" || typeof productId !== "string") {
            return res.status(400).json({ error: "Invalid request body" });
        }

        const existingProduct = await queries.getProductById(productId);
        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        const newComment = await queries.createComment({ content, productId, userId });
        res.status(200).json(newComment);

    } catch (error) {
        console.error("Error in createComment:", error);
        res.status(500).json({ error: "Failed to create comment" });
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const { commentId } = req.params;
        if (typeof commentId !== "string") {
            return res.status(400).json({ error: "Invalid comment ID" });
        }
        const existingComment = await queries.getCommentById(commentId);
        if (!existingComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        if (existingComment.userId !== userId) {
            return res.status(403).json({ error: "You can only delete your comments" });
        }
        const deletedComment = await queries.deleteComment(commentId);
        res.status(200).json(deletedComment);
    } catch (error) {
        console.error("Error in deleteComment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
}