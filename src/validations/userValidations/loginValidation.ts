import joi from "joi"

export const userLoginSchema = joi.object({
  email: joi.string().email().required().messages({
    'string.email': 'O campo email precisa ter um formato válido',
    'any.required': 'O campo email é obrigatório',
    'string.empty': 'O campo email não pode ficar vazio',
  }),

  senha: joi.string().min(5).required().messages({
    'any.required': 'O campo senha é obrigatório',
		'string.empty': 'O campo senha não pode ficar vazio',
		'string.min': 'A senha precisa conter, no mínimo,  caracteres',
  }),
}) 