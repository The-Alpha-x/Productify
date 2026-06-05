import { db } from "./index";
import { eq } from "drizzle-orm";
import { users, products, comments, type NewUser, type NewProduct, type NewComment } from "./schema";

//USER QUERIES

export const createUser = async (data: NewUser) => {
    const [createdUser] = await db.insert(users).values(data).returning();
    return createdUser;
}

export const getUserById = async (id: string) => {
    return db.query.users.findFirst({ where: eq(users.id, id) })
}

export const updateUser = async (id: string, data: Partial<NewUser>) => {
    const [updatedUser] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return updatedUser;
}

export const upsertUser = async (data: NewUser) => {
    const existingUser = await getUserById(data.id);

    if (existingUser) return updateUser(data.id, data);

    return createUser(data);
}

//PRODUCT QUERIES

export const createProduct = async (data: NewProduct) => {
    const [createdProduct] = await db.insert(products).values(data).returning();
    return createdProduct;
}

export const getAllProducts = async () => {
    return db.query.products.findMany({
        with: { user: true },
        // the square brackets are required because Drizzle ORM's orderBy expects an array, even for a single column.
        orderBy: (products, { desc }) => [desc(products.createdAt)]
    });
}


export const getProductById = async (id: string) => {
    return db.query.products.findFirst({
        where: eq(products.id, id),
        with: ({
            user: true,
            comments: {
                with: { user: true },
                orderBy: (comments, { desc }) => [desc(comments.createdAt)]
            }
        })
    })
}

export const getProductsByUserId = async (userId: string) => {
    return db.query.products.findMany({
        where: eq(products.userId, userId),
        with: ({
            user: true,
        }),
        orderBy: (products, { desc }) => [desc(products.createdAt)]
    })
}

export const updateProduct = async (id: string, data: Partial<NewProduct>) => {
    const [updatedProduct] = await db.update(products).set(data).where(eq(products.id, id)).returning();
    return updatedProduct;
}

export const deleteProduct = async (id: string) => {
    const deletedProduct = await db.delete(products).where(eq(products.id, id)).returning();
    return deletedProduct;
}

//COMMENT QUERIES

export const createComment = async (data: NewComment) => {
    const [newComment] = await db.insert(comments).values(data).returning();
    return newComment;
}

export const deleteComment = async (id: string) => {
    const deleteComment = await db.delete(comments).where(eq(comments.id, id)).returning();
    return deleteComment;
}

export const getCommentById = async (id: string) => {
    return db.query.comments.findFirst({
        where: (eq(comments.id, id)),
        with: {
            user: true
        }
    })
}