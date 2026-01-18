import { userService } from "../services/UserService.js";

class UserController {
    constructor(userService){
        this.service = userService;
    }

    getAllUsers = async(req, res) => {
        const usuarios = await this.service.getAllUsers();

        res.status(200).json({ status: "success", data: usuarios });
    };

    insertNewUser = async (req, res) => {
        try {
            const data = req.body;

            const newUser = await this.service.createUser(data);

            res.status(201).json({ status: "success", data: newUser });
        }
        catch (error){
            const statusCode = error.status || 500;

            res.status(statusCode).json({ status: "fail", message: error.message});
        }
    };

    updateUserById = async (req, res) => {
        try {
            const data = req.body;

            const { id } = req.params;

            const newInformation = await this.service.updateUser(id, data);

            res.status(200).json({ status: "success", data: newInformation})
        }
        catch (error){
            const statusCode = error.status || 500;

            res.status(statusCode).json({ status: "fail", message: error.message})
        }
    };

    deleteUserById = async (req, res) => {
        try {
            const { id } = req.params;

            await this.service.deleteUser(id);

            res.status(200).json({ status: "success", message: "Recurso Deletado!"});
        }
        catch (error){
            const statusCode = error.status || 500;

            res.status(statusCode).json({ status: "fail", message: error.message});
        }
    };
};

export const userController = new UserController(userService);