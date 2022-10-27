import { createMessage, deleteMessage, getMessage, getMessages } from "../handlers/message.js"

import express from 'express'

export const messageRouter = express.Router({ mergeParams: true })

messageRouter.route('/')
  .post(createMessage)
  .get(getMessages)

messageRouter.route('/:messageId')
  .get(getMessage)
  .delete(deleteMessage)