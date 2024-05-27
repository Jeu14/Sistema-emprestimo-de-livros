import { Request, Response } from "express"
import { studentRepository } from "../../repositories/studentRepository";
import { loanRepository } from "../../repositories/loanRepository";
import { bookRepository } from "../../repositories/bookRepository";
import { loanSchema } from "../../validations/loanValidations/lendBookValidation";

export class lendBook {
    async loan(req: Request, res: Response) {

        try {
            const { error, value } = loanSchema.validate(req.body);

            if (error) {
                const errorMessage = error.details[0].message;
                return res.status(400).json({ mensagem: errorMessage })
            }

            const {aluno_id, livro_id} = value

            const student = await studentRepository.findOne({
                where: {id: Number(aluno_id)}
            })

            if (!student) {
                return res.status(404).json({ mensagem: "Aluno não encontrado" }); 
            }

            const book = await bookRepository.findOne({
                where: {id: Number(livro_id)}
            })
            
            if (!book) {
                return res.status(404).json({ mensagem: "Livro não encontrado" }); 
            }
            
            const borrowedBook = await loanRepository.findOne({
                where: { 
                    livro_id: { id: Number(livro_id) }, 
                    devolvido: false 
                }
            });
            
            if (borrowedBook) {
                return res.status(409).json({ mensagem: "O livro informado já está emprestado para outro aluno." }); 
            }

            const newLoan = loanRepository.create({
                aluno_id,
                livro_id
            })
            
            await loanRepository.save(newLoan)

            return res.status(201).json(newLoan)

        } catch (error) {
            res.status(500).json({
                mensagem: "Não foi possível efetuar o empréstimo do livro",
            });
        }
    }
}