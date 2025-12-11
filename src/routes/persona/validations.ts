import Joi from 'joi';

export const createPersonaValidationSchema = Joi.object({
  nombre: Joi.string().required().messages({
    'string.base': `"nombre" debe ser un tipo de 'texto'`,
    'any.required': `"nombre" es un campo requerido`
  }),
  apellido: Joi.string().required().messages({
    'string.base': `"apellido" debe ser un tipo de 'texto'`,
    'any.required': `"apellido" es un campo requerido`
  }),
  telefono: Joi.string().optional().allow('').messages({
    'string.base': `"telefono" debe ser un tipo de 'texto'`
  }),
  dni: Joi.string().required().messages({
    'string.base': `"dni" debe ser un tipo de 'texto'`,
    'any.required': `"dni" es un campo requerido`
  }),
  direccion: Joi.string().optional().allow('').messages({
    'string.base': `"direccion" debe ser un tipo de 'texto'`
  }),
  mail: Joi.string().email().required().messages({
    'string.base': `"mail" debe ser un tipo de 'texto'`,
    'string.email': `"mail" debe ser un correo válido`,
    'any.required': `"mail" es un campo requerido`
  }),
  cuit: Joi.string().optional().allow('').messages({
    'string.base': `"cuit" debe ser un tipo de 'texto'`
  }),
  tipo: Joi.string().valid('Cliente', 'Empleado', 'Administrador', 'Proveedor').required().messages({
    'string.base': `"tipo" debe ser un tipo de 'texto'`,
    'any.only': `"tipo" debe ser uno de los siguientes valores: Cliente, Empleado, Administrador, Proveedor`,
    'any.required': `"tipo" es un campo requerido`
  }),
  isActive: Joi.boolean().optional().messages({
    'boolean.base': `"isActive" debe ser un booleano`
  })
});
