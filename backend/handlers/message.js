import { Message } from '../models/message.js'
import { User } from "../models/user.js"

// POST /api/users/:id/messages/
export const createMessage = async function (req, res, next) {
  try {
    const { id } = req.params
    console.log('id: ', id);
    const message = await Message.create({
      text: req.body.text,
      user: id
    })

    const user = await User.findById(id)
    user.messages.push(message)
    await user.save()

    const createdMessage = await Message.findById(message._id).populate('user', {
      photoUrl: true,
      username: true,
    })

    res.status(200).json(createdMessage)
  } catch (error) {
    return next(error)
  }
}

// GET /api/users/:id/messages/
export const getMessages = async function (req, res, next) {
  try {
    const messages = await Message.find({ user:  req.params.id })
    return res.status(200).json(messages)
  } catch (error) {
    return next(error)
  }
}

// GET /api/users/:id/messages/:messageId
export const getMessage = async function (req, res, next) {
  try {
    const message = await Message.findById(req.params.messageId)
    return res.status(200).json(message)
  } catch (error) {
    return next(error)
  }
}

// DELETE /api/users/:id/messages/:messageId
export const deleteMessage = async function (req, res, next) {
  try {
    const messageToDelete = await Message.findById(req.params.messageId)
    messageToDelete.remove()
    return res.status(200).json(messageToDelete)
  } catch (error) {
    return next(error)
  }
}

// GET /api/messages/
export const getAllMessages = async function (req, res, next) {
  try {
    const messages = await Message.find()
    .sort({ createdAt: 'desc' })
    .populate('user', {
      photoUrl: true,
      username: true,
    })
    return res.status(200).json(messages)
  } catch (error) {
    return next(error)
  }
}