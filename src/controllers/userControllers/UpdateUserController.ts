import { Request, Response } from "express";
import { loggedUser } from "./LoggedUser";
import { IUserData } from "../../interfaces/IUserData";
import { userRepository } from "../../repositories/userRepository";
import bcrypt from "bcrypt";

export class updateUser {
    async update(req: Request, res: Response) {
        const { nome, email, senha } = req.body;
        try {
            const user: IUserData = await loggedUser(req);

            const existingEmail = await userRepository.findOne({
                where: { email },
            });

            if (existingEmail && email !== user.email) {
                return res.status(409).json({
                    mensagem:
                        "Já existe usuário cadastrado com o e-mail informado.",
                });
            }

            const encryptedPass = await bcrypt.hash(senha, 10);

            await userRepository.update(user.id, {
                nome,
                email,
                senha: encryptedPass,
            });

            res.status(204).send();
        } catch (error) {
            console.log(error);

            res.status(500).json({
                mensagem:
                    "Não foi possível atualizar as informações do usuário",
            });
        }
    }
}
