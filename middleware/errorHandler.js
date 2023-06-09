const errorHandler = (error, req, res) => {
  console.log(`Server side error: >>>>>> ${error}`)
  console.log(`Name of the error ${error.name}`)
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid Object ID' })
  }
  if (error.name === 'JsonWebTokenError') {
    return res.status(404).json({ message: 'Invalid JSON Web Token.' })
  }



  return res.status(500).json({ message: 'Something went wrong' })
}

export default errorHandler