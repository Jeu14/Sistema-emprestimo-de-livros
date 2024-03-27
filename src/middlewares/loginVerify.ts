import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository";


export const loginVerify = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            mensagem:
                "Para acessar este recurso um token de autenticação válido deve ser enviado.",
        });
    }

    const token = authorization.split(" ")[1];

    try {
        const { id } = verify(token, process.env.JWT_PASS as string) as {
            id: number;
        };

        const user = await userRepository.findOne({
            where: { id },
        });

        if (!user) {
            return res.status(401).json({
                mensagem:
                    "Para acessar este recurso um token de autenticação válido deve ser enviado.",
            });
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            mensagem:
                "Para acessar este recurso um token de autenticação válido deve ser enviado.",
        });
    }
};
