import Joi from 'joi';

export const createPersonaValidationSchema = Joi.object({
	nombre: Joi.string().required().messages({
		'string.base': `"nombre" debe ser de tipo 'texto'`,
		'any.required': `"nombre" es un campo requerido`
	}),
	apellido: Joi.string().required().messages({
		'string.base': `"apellido" debe ser de tipo 'texto'`,
		'any.required': `"apellido" es un campo requerido`
	}),
	telefono: Joi.string().optional().allow('').messages({
		'string.base': `"telefono" debe ser de tipo 'texto'`
	}),
	dni: Joi.string().required().messages({
		'string.base': `"dni" debe ser de tipo 'texto'`,
		'any.required': `"dni" es un campo requerido`
	}),
	direccion: Joi.string().optional().allow('').messages({
		'string.base': `"direccion" debe ser de tipo 'texto'`
	}),
	mail: Joi.string().email().required().messages({
		'string.base': `"mail" debe ser de tipo 'texto'`,
		'string.email': `"mail" debe tener un formato de correo válido`,
		'any.required': `"mail" es un campo requerido`
	}),
	cuit: Joi.string().optional().allow('').messages({
		'string.base': `"cuit" debe ser de tipo 'texto'`
	}),
	tipo: Joi.string().valid('Cliente', 'Empleado', 'Administrador', 'Proveedor').required().messages({
		'string.base': `"tipo" debe ser de tipo 'texto'`,
		'any.required': `"tipo" es un campo requerido`
	})
});
