import { Response } from "express";
import { studentRepository } from "../../repositories/studentRepository";

export class listStudents {
    async list(res: Response) {
        try {
            const students = await studentRepository.find();

            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({
                mensagem: "Não foi possível efetuar a listagem de estudantes",
            });
        }
    }
}
