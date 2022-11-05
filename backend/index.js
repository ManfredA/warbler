import { validateUser, verifyLogin } from './middleware/auth.js';

import { authRouter } from './routes/auth.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import { errorHandler } from './handlers/error.js';
import express from 'express';
import { getAllMessages } from './handlers/message.js';
import { messageRouter } from './routes/message.js'

const PORT = 8085
const app = express()
dotenv.config();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/users/:id/messages', verifyLogin, validateUser, messageRouter)
app.use('/api/messages', verifyLogin, getAllMessages)

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})