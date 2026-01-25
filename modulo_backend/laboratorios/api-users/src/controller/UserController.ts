import type { Request, Response } from "express";
import type UserService from "../services/UserService.js";
import { AppError } from "../errors/AppError.js";

export default class UserController {
    private userService: UserService;

    constructor(userService: UserService){
        this.userService = userService;
    };

    public async getAllUsers(req: Request, res: Response) {
        try{
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        }catch(e){
            console.log(e);
            res.status(500).json({ message: "Erro Interno do Servidor!"})
        }
    }

    public async addNewUser(req: Request, res: Response) {
        try{
            const body = req.body;
            const user = await this.userService.addNewUser(body);
            res.status(201).json(user)
        } catch (error) {
            res.status(400).json({ message: (error as Error).message})
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            
            const { id } = req.params;
            const body = req.body;

            const user = await this.userService.updateUser(id as string, body);
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
                res.status(500).json({ message: "Erro interno do servidor!" })
            }
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id as string);
            res.status(204).json({ message: "Usuário deletado da base" })
        } catch (error) {
            if(error instanceof AppError) {
                res.status(error.statusCode).json({ message: error.message });
            } else {
            res.status(500).json({ message: "Erro interno do servidor!" });
            }
        }
    }
}