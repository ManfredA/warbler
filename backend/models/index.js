import dotenv from 'dotenv'
import mongoose from 'mongoose'

export * from './user.js'
export * from './message.js'
dotenv.config();

mongoose.set('debug', true)
mongoose.Promise = Promise
mongoose.connect(`mongodb+srv://crow:${process.env.MONGO_ATLAS_PASS}@cluster0.lkr2lg1.mongodb.net/?retryWrites=true&w=majority`, {
  keepAlive: true,
})
