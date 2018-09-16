const Joi = require('joi')
import { emitRouterError, JoiCustomValidationError } from 'errors'

const validateQuery = async (schema, ctx, next) => {
  const result = Joi.validate(ctx.query, schema)
  const error = result.error

  if (error) {
    for (const detail of error.details) {
      emitRouterError(new JoiCustomValidationError(error).BadRequest(), ctx)
    }
    return
  }

  await next()
}

export const validateAuthorQuery = async (ctx, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().required()
  })

  await validateQuery(schema, ctx, next)
}

export const validateCategoryQuery = async (ctx, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required()
  })

  await validateQuery(schema, ctx, next)
}

export const validateEpisodeQuery = async (ctx, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required()
  })

  await validateQuery(schema, ctx, next)
}

export const validateFeedUrlQuery = async (ctx, next) => {
  const schema = Joi.object().keys({
    url: Joi.string().required()
  })

  await validateQuery(schema, ctx, next)
}

export const validateMediaRefQuery = async (ctx, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required()
  })

  await validateQuery(schema, ctx, next)
}

export const validatePlaylistQuery = async (ctx, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required()
  })

  await validateQuery(schema, ctx, next)
}

export const validatePodcastQuery = async (ctx, next) => {
  const schema = Joi.object().keys({
    title: Joi.string().required()
  })

  await validateQuery(schema, ctx, next)
}

export const validateUserQuery = async (ctx, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().required()
  })

  await validateQuery(schema, ctx, next)
}
