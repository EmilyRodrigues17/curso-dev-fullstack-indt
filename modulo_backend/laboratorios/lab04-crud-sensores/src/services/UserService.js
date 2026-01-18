import { readUsuarioFile, writeUsuarioFile } from "../utils/userFile.js";

class UserService {
    async getAllUsers(){
        const usuarios = await readUsuarioFile();
        return usuarios;
    }

    async createUser(data){
        const { id, email, senha } = data;

        if (!id){
            const error = new Error("ID obrigatório!")
            error.status = 400;
            throw error;
        }

        const usuarios = await this.getAllUsers();
        const indexEncontrado = usuarios.findIndex(u => u.email === email);
        if (indexEncontrado !== -1){
            const error = new Error("Usuário já existente");
            error.status = 409;
            throw error;
        }

        if (senha.length < 6){
            const error = new Error("Senha precisa conter pelo menos 6 digitos");
            error.status = 400;
            throw error;
        }

        const newUsuario = {id, email, senha};
        usuarios.push(newUsuario);

        await writeUsuarioFile(usuarios);
        return newUsuario;
    };

    async updateUser(id, data){
        if (!id){
            const error = new Error("ID obrigatório!");
            error.status = 400;
            throw error;
        }

        const usuarios = await this.getAllUsers();
        const indexEncontrado = usuarios.findIndex(u => u.id === id);
        if (indexEncontrado === -1){
            const error = new Error('Usuário não encontrado!');
            error.status = 404;
            throw error;
        }

        const { email, senha } = data;
        const dadosNovos = {email, senha}

        usuarios[indexEncontrado] = {...usuarios[indexEncontrado], ...dadosNovos};

        await writeUsuarioFile(usuarios);
        return usuarios[indexEncontrado];
    }

    async deleteUser(id){
        if (!id){
            const error = new Error("ID obrigatório!");
            error.status = 400;
            throw error;
        }

        const usuarios = await this.getAllUsers();
        const indexEncontrado = usuarios.findIndex(u => u.id === id);
        if (indexEncontrado === -1){
            const error = new Error('Usuário não encontrado!');
            error.status = 404;
            throw error;
        }

        const newUsuarios = usuarios.filter(row => row.id !== id);

        await writeUsuarioFile(newUsuarios);
    }
};

export const userService = new UserService();