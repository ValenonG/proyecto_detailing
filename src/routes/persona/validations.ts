import Joi from 'joi';

export const registerValidationSchema = Joi.object({
	email: Joi.string().email().required().messages({
		'string.base': `"email" debe ser de tipo 'texto'`,
		'string.email': `"email" debe tener un formato de correo válido`,
		'any.required': `"email" es un campo requerido`
	}),
	nombre: Joi.string().required().messages({
		'string.base': `"nombre" debe ser de tipo 'texto'`,
		'any.required': `"nombre" es un campo requerido`
	}),
	apellido: Joi.string().required().messages({
		'string.base': `"apellido" debe ser de tipo 'texto'`,
		'any.required': `"apellido" es un campo requerido`
	}),
	dni: Joi.string().required().messages({
		'string.base': `"dni" debe ser de tipo 'texto'`,
		'any.required': `"dni" es un campo requerido`
	}),
	telefono: Joi.string().optional().messages({
		'string.base': `"telefono" debe ser de tipo 'texto'`
	}),
	direccion: Joi.string().optional().messages({
		'string.base': `"direccion" debe ser de tipo 'texto'`
	}),
	cuit: Joi.string().optional().messages({
		'string.base': `"cuit" debe ser de tipo 'texto'`
	}),
	tipo: Joi.string().valid('Cliente', 'Empleado', 'Administrador', 'Proveedor').optional().default('Cliente').messages({
		'string.base': `"tipo" debe ser de tipo 'texto'`
	})
});

export const loginValidationSchema = Joi.object({
	email: Joi.string().email().required().messages({
		'string.base': `"email" debe ser de tipo 'texto'`,
		'string.email': `"email" debe tener un formato de correo válido`,
		'any.required': `"email" es un campo requerido`
	}),
	password: Joi.string().required().messages({
		'string.base': `"password" debe ser de tipo 'texto'`,
		'any.required': `"password" es un campo requerido`
	})
});
