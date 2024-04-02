import { Request, Response } from "express";
import { studentRepository } from "../../repositories/studentRepository";

export class registerStudent {
    async store(req: Request, res: Response) {
        try {
            const { nome, email } = req.body;

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
