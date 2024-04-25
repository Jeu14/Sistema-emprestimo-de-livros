import { Request, Response } from "express";
import { studentRepository } from "../../repositories/studentRepository";
import { studentSchema } from "../../validations/studentValidations/studentValidation";

export class studentUpdate {
  async update(req: Request, res: Response) {
    try {
      const { error, value } = studentSchema.validate(req.body);

      if (error) {
        const errorMessage = error.details[0].message;
        return res.status(400).json({ mensagem: errorMessage });
      }

      const { nome, email } = value;
      const id = Number(req.params.id);

      const student = await studentRepository.findOne({
        where: {id},
      });
      
      if (!student) {
        return res.status(404).json({
           mensagem: "Aluno não encontrado" 
          });
      }

      const existingEmail = await studentRepository.findOne({
        where: { email },
      });

      if (existingEmail) {
        return res.status(409).json({
          mensagem: "O e-mail informado já existe para outro aluno.",
        });
      }

      await studentRepository.update(id, {
        nome,
        email,
      });

      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        mensagem: "Não foi possível atualizar as informações do(a) aluno(a)",
      });
    }
  }
}
