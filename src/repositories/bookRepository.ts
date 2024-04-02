import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";

export const bookRepository = AppDataSource.getRepository(Book).extend({
    async findByTitle(titulo: string) {
        return this.find({ where: { titulo } });
    },
});
