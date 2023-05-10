/* eslint-disable no-unused-vars */
import express from 'express'
import PlanModel from './models/plans.js'
import connectToDb from './utils/db.js'
import logger from './middleware/logger.js'
import router from './router.js'

const PORT = 4000
const app = express()

app.use(express.json())

//Logger from middleware folder//
app.use(logger)

app.use(router)

app.get('/', async (req, res, next) => {
  return res.status(200).send('API is running')
})

// Update an entry //

app.put('/plans/:id', async (req, res) => {
  const { id } = req.params
  const { body: updatedPlan } = req
  const updatedDocument = await PlanModel.findByIdAndUpdate(id, updatedPlan, { new: true })
  if (!updatedDocument) {
    return res.status(404).json({ message: 'This id cannot be found' })
  } else {
    return res.status(200).json(updatedDocument)

  }
})

// DELETE an entry //

app.delete('/plans/:id', async (req, res) => {
  const { id } = req.params

  const foundResource = await PlanModel.findById(id)
  if (!foundResource) {
    return res.status(404).json(`Plan with id ${id} does not exist.`)
  }
  const deletedPlan = await PlanModel.findByIdAndDelete(id)
  return res.status(200).json({ 
    message: `Plan with ID ${id} has been deleted`,
    deletedPlan,
  })
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