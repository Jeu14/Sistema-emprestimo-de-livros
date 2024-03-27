import { Request, Response } from "express";
import { loggedUser } from "./LoggedUser";
import { IUserData } from "../../interfaces/IUserData";

export class userDetails {
    async index(req: Request, res: Response) {
        try {
            const userId: IUserData = await loggedUser(req);
            return res.status(200).json(userId);
        } catch (error) {
            res.status(500).json({
                message: "Não foi possível detalhar as informações do usuário",
            });
        }
    }
}
