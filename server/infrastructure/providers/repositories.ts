import mongo from '../repositories/mongo'
import { MongoUserRepository } from '../repositories/mongo-user-repository'

const userRepository = new MongoUserRepository(mongo)

export {
  userRepository
}
