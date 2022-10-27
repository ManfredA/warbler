import { User } from '../models/index.js'
import jwt from 'jsonwebtoken'

export const signIn = async function (req, res, next) {
  try {
    const { email, password } = req?.body;
    const user = await User.findOne({
      email
    })
    const { id, username, photoUrl } = user;
    console.log('username: ', username);
    const isMatch = await user.comparePassword(password);
    console.log('isMatch: ', isMatch);
    if(isMatch) {
      // TODO: abstract the repeated code
      const token = jwt.sign({
        id,
        password,
        photoUrl,
        username,
      }, process.env.JWT_SECRET_KEY)

      res.status(200).json({
        id,
        photoUrl,
        token,
        username,
      })
    }
    else {
      return next ({
        status: 400,
        message: 'Wrong email or password'
      })
    }
  } catch (error) {
    console.log('error: ', error);
    return next ({
      status: 400,
      message: 'Wrong email or password'
    })
  }
}

export const signup = async function (req, res, next) {
  try {
    const user = await User.create(req.body)
    const { id, password, photoUrl, username } = user;
    const token = jwt.sign({
      id,
      password,
      photoUrl,
      username,
    }, process.env.JWT_SECRET_KEY)

    console.log('aqui!');
    return res.status(200).json({
      id,
      username,
      token,
      photoUrl,
    })
  } catch (error) {
    if(error.code === 11000) {
      error.message = 'Sorry, that username and/or email is taken'
    }

    return next({
      status: 400,
      message: error.message
    })
  }
}