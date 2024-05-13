import { AppDataSource } from "../data-source";
import { Loan } from "../entities/Loan";

export const loanRepository = AppDataSource.getRepository(Loan).extend({
    async findById(id: number) {
        return this.find({ where: { id } });
    },
});


// export const loanRepository = AppDataSource.getRepository(Loan).extend({
//     async findById(id: number) {
//         return this.findOne({ where: { id } });
//     },
// });