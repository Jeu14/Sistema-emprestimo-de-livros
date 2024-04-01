import { AppDataSource } from "../data-source";
import { Book } from "../entities/Books";


export const bookRepository = AppDataSource.getRepository(Book).extend({
  async findByName(titulo: string) {
      return this.find({where: {titulo}})
  },
});