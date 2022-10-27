import mongoose from 'mongoose'

export * from './user.js'
export * from './message.js'

mongoose.set('debug', true)
mongoose.Promise = Promise
mongoose.connect('mongodb://localhost:27014/warbler', {
  keepAlive: true,
})
