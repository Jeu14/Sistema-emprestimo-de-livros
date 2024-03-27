import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { loggedUser } from "./LoggedUser";
import { IUserData } from "../interfaces/IUserData";

export class userDetails {
    async index(req: Request, res: Response) {
        const userId: IUserData = await loggedUser(req);

        if (!userId) {
            return res.json({ mensage: "ruim" });
        }

        try {
            const user = await userRepository.findOne({
                where: { id: userId.id },
            });

            const { senha, ...userData } = user!;
            return res.status(200).json(userData);
        } catch (error) {
            res.status(500).json({
                message: "Não foi possível cadastrar o usuário",
            });
        }
    }
}
