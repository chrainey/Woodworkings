/* eslint-disable no-unused-vars */
import express from 'express'
import connectToDb from './utils/db.js'
import auth from './middleware/auth.js'
import logger from './middleware/logger.js'
import router from './router.js'
import CONSTS from './consts.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()

app.use(express.json())
app.use(logger)

app.use(router)
app.use(errorHandler)

// Error Handling to catch all other enpoints //
app.use((req, res, next) => {
  return res.status(404).send('Endpoint not found.')
})

const startServer = async () => {
  await connectToDb()
  console.log('Database has connected successfully.')
  // Setting our local host port //
  app.listen(CONSTS.PORT, () => {
    console.log(`Express server running on port ${CONSTS.PORT}`)
  })
}

startServer()