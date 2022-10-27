import { signIn, signup } from '../handlers/index.js';

import express from 'express'

export const authRouter = express.Router();

authRouter.post('/signin', signIn)
authRouter.post('/signup', signup)

// export { authRouter }