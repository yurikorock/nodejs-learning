import Joi from 'joi';

export const studentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  year: Joi.number().required(),
  gender: Joi.string().valid('male', 'female').required(),
  onDuty: Joi.boolean(),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  year: Joi.number(),
  gender: Joi.string().valid('male', 'female'),
  onDuty: Joi.boolean(),
});
