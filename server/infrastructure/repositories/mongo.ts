import { MongoClient } from 'mongodb'

const mongoUri = process.env.MONGO_URI ?? 'mongodb://localhost:27017/test'

const mongo = new MongoClient(mongoUri)

export default mongo
