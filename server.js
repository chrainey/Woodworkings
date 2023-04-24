/* eslint-disable no-unused-vars */
import express from 'express'
import mongoose from 'mongoose'

const connectToDb = async () => {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  return mongoose.connect('mongodb://localhost:27017/plans', opts)
}

const PORT = 4000
const app = express()

app.use(express.json())

// Logger Middleware
app.use((req, _res, next) => {
  console.log('This is running server side')
  console.log(`Incoming request: Method: ${req.method} - URL: ${req.url}`)
  next()
})

app.get('/', (req, res, next) => {
  return res.status(200).send('API is running')
})

app.get('/random', (req, res, next) => {
  return res.status(204).send(`Random Number: ${Math.random() * 10}`)
})

//Error Handling to catch all other enpoints

app.use((req, res, next) => {
  return res.status(404).send('Endpoint not found.')
})

const startServer = async () => {
  await connectToDb()
  console.log('Database has connected successfully.')
  // Setting our local host port //
  app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`)
  })
}


startServer()