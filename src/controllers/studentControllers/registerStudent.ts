import { Request, Response } from "express";
import { studentRepository } from "../../repositories/studentRepository";
import { studentSchema } from "../../validations/studentValidations/studentValidation";

export class registerStudent {
    async store(req: Request, res: Response) {
        try {
            const { error, value } = studentSchema.validate(req.body);

            if (error) {
                const errorMessage = error.details[0].message;
                return res.status(400).json({ mensagem: errorMessage });
            }

            const { nome, email } = value;

            const existingEmail = await studentRepository.findOne({
                where: { email },
            });

            if (existingEmail) {
                res.status(409).json({
                    mensagem: "O e-mail informado já existe para outro aluno.",
                });
            }

            const newStudent = studentRepository.create({
                nome,
                email,
            });

            await studentRepository.save(newStudent);

            const formattedStudentData = {
                id: newStudent.id,
                nome: newStudent.nome,
                email: newStudent.email,
            };

            return res.status(201).json(formattedStudentData);
        } catch (error) {
            res.status(500).json({
                mensagem: "Não foi possível efetuar o cadastro do(a) aluno(a",
            });
        }
    }
}
