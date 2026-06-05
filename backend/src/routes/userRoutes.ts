import { Router } from "express";
import { syncUser } from "../controllers/userController";
import { requireAuth } from "@clerk/express";

const router = Router();

// api/user/sync (POST) => sync clerk users to db

router.post("/sync", requireAuth(), syncUser)

export default router;