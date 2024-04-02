import { Request, Response } from "express";
import { bookRepository } from "../../repositories/bookRepository";

export class booksDetails {
    async index(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const book = await bookRepository.findOne({
                where: { id: Number(id) },
            });

            if (!book) {
                res.status(404).json({ mensagem: "Livro não encontrado" });
            }
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({
                mensagem: "Não foi possível efetuar o detalhamento do livro",
            });
        }
    }
}
