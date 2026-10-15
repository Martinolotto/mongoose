import { Router } from "express"

export const userRouter = Router();

import { 
    createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";
 

userRouter.post("/users", createUser)

userRouter.get("/users", getUser);

userRouter.get("/users", getUserById);

userRouter.put("/users", updateUser);

userRouter.delete("/users", deleteUser);