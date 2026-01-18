import { Router } from "express";
import { userController } from "../controllers/UserController.js";

const userRouter = Router();

userRouter.get("/user", userController.getAllUsers);

userRouter.post("/user", userController.insertNewUser);

userRouter.put("/user/:id", userController.updateUserById);

userRouter.delete("/user/:id", userController.deleteUserById);

export default userRouter;