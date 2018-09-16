import { validate } from 'class-validator'
import { getRepository } from 'typeorm'
import { User } from 'entities'
import { CustomValidationError } from 'errors'
import { create } from 'domain';
const createError = require('http-errors')

const relations = ['playlists']

const createUser = async (obj) => {
  const repository = getRepository(User)
  const user = new User()
  const newUser = Object.assign(user, obj)
  await repository.save(newUser)
  return {
    ...newUser
  }
}

const deleteUser = async (id) => {
  const repository = getRepository(User)
  const user = await repository.findOne({ id })
  const result = await repository.remove(user)
  return result
}

const getUser = async (id) => {
  const repository = getRepository(User)
  return repository.findOne({ id }, { relations })
}

const getUsers = (query) => {
  const repository = getRepository(User)

  return repository.find({
    where: {
      ...query
    },
    relations
  })
}

const updateUser = async (obj) => {
  const repository = getRepository(User)
  const user = await repository.findOne({ id: obj.id })

  if (!user) {
    throw new createError.NotFound('User not found')
  }

  const newUser = Object.assign(user, obj)

  const errors = await validate(newUser)

  if (errors.length > 0) {
    for (const error of errors) {
      throw new CustomValidationError(error).BadRequest()
    }
  }

  await repository.save(newUser)
  return {
    ...newUser
  }
}

export {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser
}
