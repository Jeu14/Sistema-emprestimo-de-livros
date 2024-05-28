import { Request, Response } from "express";
import { loanRepository } from "../../repositories/loanRepository";

export class loanDetails {
    async index(req: Request, res: Response)  {
        try {
            const { id } = req.params

            const loan = await loanRepository.findOne({
                where: {id: Number(id)},
                relations: ["aluno_id", "livro_id"]
            })!

            if (!loan) {
                return res.status(404).json({mensagem: "Empréstimo não encontrado."})
            }

            const response = {
                id: loan.id,
                devolvido: loan.devolvido,
                aluno: {
                    id: loan.aluno_id.id,
                    nome: loan.aluno_id.nome,
                    email: loan.aluno_id.email
                },
                livro: {
                    id: loan.livro_id.id,
                    titulo: loan.livro_id.titulo,
                    autor: loan.livro_id.autor,
                    descricao: loan.livro_id.descricao
                }
            }

            return res.status(200).json(response)
        } catch (error) {
            res.status(500).json({
                mensagem: "Não foi possível efetuar a listagem de empréstimos",
            });
        }
    }
}