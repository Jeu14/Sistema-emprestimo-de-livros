import { Request, Response } from "express"
import { loanRepository } from "../../repositories/loanRepository";

export class returnBook {
    async loan(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const loan = await loanRepository.findOne({
                where: {id}
            });

            if (!loan) {
                res.status(409).json({ mensagem: "Não há empréstimos cadastrados com esse ID" })
            }

            if (loan?.devolvido) {
                return res.status(400).json({mensagem: "O empréstimo informado já houve a devolução anteriormente."})
            }
            await loanRepository.update(id, {
                devolvido: true
            })

            res.status(204).send();
        } catch (error) {
            console.log(error);
            
            res.status(500).json({
                mensagem: "Não foi possível efetuar a devolução do livro"
            })
        }
    }
}