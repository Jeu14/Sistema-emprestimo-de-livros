import { AppDataSource } from "../data-source";
import { Student } from "../entities/Student";

export const studentRepository = AppDataSource.getRepository(Student).extend({
    async findByName(nome: string) {
        return this.find({ where: { nome } });
    },
});
