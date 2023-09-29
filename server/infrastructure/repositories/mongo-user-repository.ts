import { MongoClient, ObjectId } from 'mongodb'
import { UserRepository } from '@domain/users/user-repository'
import { User, NewUser } from '@domain/users/types'
import { map } from '@domain/utils'
import { UserDocument } from './types'

const DATABASE_NAME = 'test'
const USERS_COLLECTION = 'users'

export class MongoUserRepository implements UserRepository {
  private readonly _mongoClient: MongoClient

  constructor(mongoClient: MongoClient) {
    this._mongoClient = mongoClient
  }

  findAll: () => Promise<User[]> = async () => {
    await this._mongoClient.connect()

    const result = await this._mongoClient.db(DATABASE_NAME)
      .collection<UserDocument>(USERS_COLLECTION)
      .find({})
      .toArray()

    await this._mongoClient.close()

    return result.map(({ _id, ...user }) => ({
      id: _id.toString(),
      ...user
    }))
  }

  findById: (id: string) => Promise<User | null> = async (id) => {
    await this._mongoClient.connect()

    const result = await this._mongoClient.db(DATABASE_NAME)
      .collection<UserDocument>(USERS_COLLECTION)
      .findOne({ _id: new ObjectId(id) })

    await this._mongoClient.close()

    return map(result, ({ _id, ...user }) => ({
      id: _id.toString(),
      ...user
    }))
  }

  findByUsername: (username: string) => Promise<User | null> = async (username) => {
    await this._mongoClient.connect()

    const result = await this._mongoClient.db(DATABASE_NAME)
      .collection<UserDocument>(USERS_COLLECTION)
      .findOne({ username })

    await this._mongoClient.close()

    return map(result, ({ _id, ...user }) => ({
      id: _id.toString(),
      ...user
    }))
  }

  save: (user: NewUser) => Promise<User> = async (user) => {
    await this._mongoClient.connect()

    const result = await this._mongoClient.db(DATABASE_NAME)
      .collection<NewUser>(USERS_COLLECTION)
      .insertOne(user)

    await this._mongoClient.close()

    return {
      id: result.insertedId.toString(),
      ...user
    }
  }

  update: (user: User) => Promise<boolean> = async (user) => {
    await this._mongoClient.connect()

    const oId = new ObjectId(user.id)
    const result = await this._mongoClient.db(DATABASE_NAME)
      .collection<UserDocument>(USERS_COLLECTION)
      .updateOne({ _id: oId }, { $set: user })

    await this._mongoClient.close()

    return result.modifiedCount === 1
  }
}
