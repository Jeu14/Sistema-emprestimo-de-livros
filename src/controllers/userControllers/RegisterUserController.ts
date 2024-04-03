import { Request, Response } from "express";
import { userRepository } from "../../repositories/userRepository";
import bcrypt from "bcrypt";
import { userSchema } from "../../validations/userValidations/registerAndUpdateUserValidation";

export class registerUserController {
    async store(req: Request, res: Response) {
        const { error, value } = userSchema.validate(req.body);

        if (error) {
            const errorMessage = error.details[0].message;
            return res.status(400).json({ mensagem: errorMessage });
        }

        const { nome, email, senha } = value;

        const existingEmail = await userRepository.findOne({
            where: { email },
        });

        if (existingEmail) {
            return res.status(409).json({
                mensagem:
                    "Já existe usuário cadastrado com o e-mail informado.",
            });
        }

        const encryptedPass = await bcrypt.hash(senha, 10);

        try {
            const newUser = userRepository.create({
                nome,
                email,
                senha: encryptedPass,
            });

            await userRepository.save(newUser);

            const { senha, ...userWhithoutPass } = newUser;

            return res.status(201).json(userWhithoutPass);
        } catch (error) {
            res.status(500).json({
                message: "Não foi possível cadastrar o usuário",
            });
        }
    }
}
