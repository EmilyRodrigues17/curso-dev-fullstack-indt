import { appDataSource } from "../datasource/appDataSource.js";
import { User } from "../entity/User.js";
import { AppError } from "../errors/AppError.js";

class UserService {
    private userMemoria: User[] = [];
    private repositoryUser = appDataSource.getRepository(User);

    public async getAllUsers(): Promise<User[]> {

        if(this.userMemoria.length > 0) {
            return this.userMemoria;
        }

        const sensors = await this.repositoryUser.find();
        return sensors;
    }

    public async addNewUser(body: unknown): Promise<User> {
        const { nome, email, genero, password } = body as User;

        if(!genero || !nome ) {
            throw new AppError(400,"Missing required infos fields");
        }

        if(nome.length <= 5) {
            throw new AppError(422,"Campos nome deve ter mais de 5 caracteres")
        }

        if(password.length <= 6) {
            throw new AppError(422,"Campos password deve ter mais de 6 caracteres")
        }

        const user = await this.repositoryUser.findOne({
            where:{
                email: email
            }
        })

        if (user){
            throw new AppError(400, 'Usuário já cadastrado!');
        }

        const newUser = { nome, email, genero, password, status: true };
        const userSerializado = await this.repositoryUser.create(newUser as User);

        await this.repositoryUser.save(userSerializado);

        return userSerializado;
    }

    public async updateUser(id: string, body: User): Promise<User> {
        const user = await this.repositoryUser.findOneBy({id});

        console.log(user)
        // update so em usuario ativo
        if (!user) {
            throw new AppError(404, "Usuário não encontrado.");
        }

        if (user.status === false) {
            throw new AppError(400, "Não é possível atualizar um usuário inativo.");
        }

        const { nome, email, genero, password } = body;

        console.log(body)

        if (nome !== undefined) {
            if(nome.length <= 5) {
                throw new AppError(422,"Campos nome deve ter mais de 5 caracteres")
            }
        }

        if (password !== undefined) {
            if(password.length <= 6) {
                throw new AppError(422,"Campos password deve ter mais de 6 caracteres")
            }
        }

        if (email) {
            const userExists = await this.repositoryUser.findOne({
                where:{
                    email: email
                }
            })
    
            if (userExists && userExists.id !== id){
                throw new AppError(400, 'Email já cadastrado por outro usuário!');
            }
        }

        const newUser = await this.repositoryUser.create(body)

        const updatedUser = this.repositoryUser.merge(user, newUser);

        await this.repositoryUser.save(updatedUser);

        return updatedUser;
    }

    public async deleteUser(id: string){
        const user = await this.repositoryUser.findOneBy({id})

        if (!user){
            throw new AppError(404, "Usuário não encontrado.")
        }

        if (user.status === false) {
            throw new AppError(400, "Usuário já se encontra deletado da base")
        }

        user.status = false;
        await this.repositoryUser.save(user);
    }
}

export default UserService;