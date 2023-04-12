/* eslint-disable no-unused-vars */
import express from 'express'

const PORT = 4000
const app = express()

app.use((req, _res, next) => {
  console.log('Middleware being hit')
  console.log(`Incoming request: Method: ${req.method} - URL: ${req.url}`)
  next()
})

app.use((req, res, next) => {
  console.log('Router is getting hit')
  if (req.method === 'GET' && req.url === '/') {
    res.status(200).send('API is Running')
  }
  next()
})

// Setting our local host port //
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`)
})

console.log('Hello from node environment')