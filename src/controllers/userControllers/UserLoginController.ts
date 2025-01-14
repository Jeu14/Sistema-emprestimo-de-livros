import { Request, Response } from "express";
import { userRepository } from "../../repositories/userRepository";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { userLoginSchema } from "../../validations/userValidations/loginValidation";

export class userLoginController {
    async login(req: Request, res: Response) {
        try {
            const { error, value } = userLoginSchema.validate(req.body);

            if (error) {
                const errorMessage = error.details[0].message;
                return res.status(400).json({ mensagem: errorMessage });
            }

            const { email, senha } = value;

            const user = await userRepository.findOne({
                where: { email },
            });

            if (!user || !(await bcrypt.compare(senha, user.senha))) {
                return res.status(401).json({
                    mensagem: "Usuário e/ou senha inválido(s).",
                });
            }

            const { senha: userPass, ...userWhithoutPass } = user;

            const secretKey = process.env.JWT_PASS || "";

            const token = sign({ id: user.id }, secretKey, {
                expiresIn: "8h",
            });
            return res.status(200).json({ usuario: userWhithoutPass, token });
        } catch (error) {
            res.status(500).json({
                message: "Não foi possível cadastrar o usuário",
            });
        }
    }
}
