import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('dev', 'prod').required(),
  HASH_ROUNDS: Joi.number().max(12).required(),
  ISSUER: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().min(64).required(),
  REFRESH_TOKEN_SECRET: Joi.string().min(64).required(),
  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  REDIS_URL: Joi.string().required(),
});