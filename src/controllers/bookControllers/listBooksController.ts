import { Response, Request } from "express";
import { bookRepository } from "../../repositories/bookRepository";

export class listBooks {
    async list(req: Request, res: Response) {
        try {
            const books = await bookRepository.find();
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({
                mensagem: "Não foi possível efetuar a listagem de livros",
            });
        }
    }
}
