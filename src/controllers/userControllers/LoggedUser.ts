import { Request } from "express";
import jwt from "jsonwebtoken";
import { userRepository } from "../../repositories/userRepository";
import { IUserData } from "../../interfaces/IUserData";

// export interface UserData {
//   id: number;
//   nome: string;
//   email: string
// }

export const loggedUser = async (req: Request): Promise<IUserData> => {
    const { authorization } = req.headers;

    const [, token] = authorization!.split(" ");

    const { id } = jwt.verify(token, process.env.JWT_PASS as string) as {
        id: number;
    };

    const user = await userRepository.findOne({
        where: { id },
    });

    const { senha, ...userData } = user!;

    return userData as IUserData;
};
