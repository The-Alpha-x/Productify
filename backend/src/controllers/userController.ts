import { type Request, type Response } from "express";
import * as queries from "../db/queries";

import { getAuth } from "@clerk/express";

export async function syncUser(req: Request, res: Response) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return res.status(401).json({ error: "Unauthorized" })

        const { email, name, imageUrl } = req.body;

        if (!email || !name || !imageUrl) {
            return res.status(400).json({ error: "All fields are required" })
        }

        const updatedUser = await queries.upsertUser({
            id: userId,
            email,
            name,
            imageUrl: imageUrl,
        });

        res.status(200).json(updatedUser);

    }
    catch (error) {
        console.log("error syncing user", error);
        res.status(500).json({ error: "Internal server error" })
    }
}