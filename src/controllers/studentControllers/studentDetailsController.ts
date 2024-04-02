import { Request, Response } from "express";
import { studentRepository } from "../../repositories/studentRepository";

export class studentDetails {
    async index(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const student = await studentRepository.findOne({
                where: { id: Number(id) },
            });

            if (!student) {
                res.status(404).json({
                    mensagem: "Aluno(a) não encontrado(a)",
                });
            }

            return res.status(200).json(student);
        } catch (error) {
            res.status(500).json({
                mensagem: "Não foi possível efetuar o detalhamento do aluno",
            });
        }
    }
}
