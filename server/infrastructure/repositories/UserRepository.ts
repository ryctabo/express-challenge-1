import { MongoClient, ObjectId } from 'mongodb'
import { NewUser, User, UserWithoutSensitiveData } from '../../types'

const mongoUri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/test'
const mongoClient = new MongoClient(mongoUri)

const DATABASE_NAME = 'test'
const USERS_COLLECTION = 'users'

const getAllUsers = async (): Promise<UserWithoutSensitiveData[]> => {
  await mongoClient.connect()

  const result = await mongoClient.db(DATABASE_NAME)
    .collection(USERS_COLLECTION)
    .find({})
    .toArray()

  await mongoClient.close()

  return result.map(({ _id, username, email, displayName, favorites }) => ({
    id: _id.toString(),
    username,
    email,
    displayName,
    favorites
  }))
}

const getUserById = async (id: string): Promise<User | null> => {
  await mongoClient.connect()

  const result = await mongoClient.db(DATABASE_NAME)
    .collection(USERS_COLLECTION)
    .findOne({ _id: new ObjectId(id) })

  await mongoClient.close()

  if (result !== null) {
    const { _id, username, email, displayName, password, favorites } = result
    return {
      id: _id.toString(),
      username,
      email,
      displayName,
      password,
      favorites
    }
  }

  return null
}

const getUserByUsername = async (username: string): Promise<User | null> => {
  await mongoClient.connect()

  const result = await mongoClient.db(DATABASE_NAME)
    .collection(USERS_COLLECTION)
    .findOne({ username })

  await mongoClient.close()

  if (result !== null) {
    const { _id, username, email, displayName, password, favorites } = result
    return {
      id: _id.toString(),
      username,
      email,
      displayName,
      password,
      favorites
    }
  }

  return null
}

const createNewUser = async (user: NewUser): Promise<UserWithoutSensitiveData> => {
  await mongoClient.connect()

  const result = await mongoClient.db(DATABASE_NAME)
    .collection(USERS_COLLECTION)
    .insertOne(user)

  await mongoClient.close()

  const { password, ...noSensitiveData } = user
  return {
    id: result.insertedId.toString(),
    ...noSensitiveData
  }
}

const updateUser = async (user: User): Promise<boolean> => {
  await mongoClient.connect()

  const oId = new ObjectId(user.id)
  const result = await mongoClient.db(DATABASE_NAME)
    .collection(USERS_COLLECTION)
    .updateOne({ _id: oId }, user)

  await mongoClient.close()

  return result.modifiedCount === 1
}

export {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createNewUser,
  updateUser
}
