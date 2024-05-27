import joi from "joi";

export const loanSchema = joi.object({
  livro_id: joi.number().integer().required().messages({
    "number.integer": "o ID do livro deve ser um número inteiro",
    "number.positive": "O ID do livro deve ser um número positivo",
    "any.required": "O campo livro_id é obrigatório",
  }),
  aluno_id: joi.number().integer().positive().required().messages({
    "number.integer": "o ID do aluno deve ser um número inteiro",
    "number.positive": "O ID do aluno deve ser um número positivo",
    "any.required": "O campo aluno_id é obrigatório",
  }),
});
