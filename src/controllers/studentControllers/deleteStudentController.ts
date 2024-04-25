import { Request, Response } from "express";
import { studentRepository } from "../../repositories/studentRepository";
import { loanRepository } from "../../repositories/loanRepository";

export  class deleteStudent {
    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)

            const student = await studentRepository.findOne({
                where: {id},
              });
              
              if (!student) {
                return res.status(404).json({
                   mensagem: "Aluno não encontrado" 
                  });
              }

              await loanRepository.delete({id})
              await studentRepository.delete({id})

              res.status(204).send()
        } catch (error) {
            res.status(500).json({
                mensagem: "Não foi possível efetuar a exclusão do aluno(a)",
              });
        }
    }
}