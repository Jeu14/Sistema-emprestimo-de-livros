import { Request, Response } from "express";
import { loanRepository } from "../../repositories/loanRepository";

export class listLoans {
    async list(req: Request, res: Response) {
        try {
            const repository = await loanRepository.find({ relations: ["aluno_id", "livro_id"] });

            const loans = repository.map(loan => ({
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
            }));
        
            res.status(200).json(loans)
        } catch (error) {
            res.status(500).json({
                mensagem: "Não foi possível efetuar a listagem de empréstimos",
            });
        }
    }
}