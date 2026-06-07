import express from "express";
import cors from "cors";

import { ENV } from "./config/env";
import { clerkMiddleware } from '@clerk/express'

import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true })); //allow the frontend to send cookies to the backend so that we can authenticate the user
app.use(clerkMiddleware()); //auth obj will be attached to req
app.use(express.json()); //to handle json data
app.use(express.urlencoded({ extended: false })); //to handle form data

app.get("/", (req, res) => {
    res.json({
        sucess: true,
        message: "Welcome to Productify API - Powered by PostfresSQL, Drizzle ORM & Clerk Auth",
        endpoints: {
            users: "/api/users",
            products: "/api/products",
            comments: "/api/comments"
        }
    })
})

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

app.listen(ENV.PORT, () => {
    console.log(`Server is running on port ${ENV.PORT}`);
});