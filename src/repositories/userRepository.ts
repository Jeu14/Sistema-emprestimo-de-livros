import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export const userRepository = AppDataSource.getRepository(User).extend({
    async findByName(nome: string) {
        return this.find({where: {nome}})
    },
});
