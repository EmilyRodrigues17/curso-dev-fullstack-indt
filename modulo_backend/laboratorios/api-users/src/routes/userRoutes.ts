import { Router } from "express";
import UserService from "../services/UserService.js";
import UserController from "../controller/UserController.js";

const userRouter = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRouter.get('/user', (req, res) => userController.getAllUsers(req, res));
userRouter.post('/user', (req, res) => userController.addNewUser(req, res));
userRouter.put('/user/:id', (req, res) => userController.updateUser(req, res));
userRouter.delete('/user/:id', (req, res) => userController.deleteUser(req, res))

export default userRouter;