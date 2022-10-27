export function errorHandler(error, req, res, next) {
  console.log('here!');
  return res.status( error.status || 500).json({
    error: {
      message: error.message || 'Something went wrong...'
    }
  })
}