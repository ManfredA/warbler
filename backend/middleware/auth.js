import jwt from 'jsonwebtoken'

export function verifyLogin(req, res, next) {
  try {
    const token = getToken(req.headers.authorization)
    jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
      if(decoded) {
        return next()
      }
      else {
        return next({ status: 401,  message: 'Please log in first'})
      }
    })
  } catch (error) {
    return next({ status: 401,  message: 'Please log in first'})
  }
}

export function validateUser(req, res, next) {
  try {
    const token = getToken(req.headers.authorization)
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
      if(decoded && decoded.id === req.params.id) {
        return next()
      } else {
        return next({ status: 401,  message: 'Unauthorized'})
      }
    })
  } catch (error) {
    return next({ status: 401,  message: 'Unauthorized'})
  }
}

//#region Private members
  function getToken(authorizationHeader) {
    const [_, token] = authorizationHeader?.split(' ')
    return token
  }
//#endregion Private members