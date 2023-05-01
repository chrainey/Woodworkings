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

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  author: { type: String, required: true },
  type: String,
  createdAt: { type: Date, default: Date.now },
})

const PlanModel = mongoose.model('Plan', planSchema)

const PORT = 4000
const app = express()

app.use(express.json())

// Logger Middleware
app.use((req, _res, next) => {
  console.log('This is running server side')
  console.log(`Incoming request: Method: ${req.method} - URL: ${req.url}`)
  next()
})

app.get('/', async (req, res, next) => {
  return res.status(200).send('API is running')
})

// Get all plans //

app.get('/plans', async (req, res, next) => {
  const allPlans = await PlanModel.find()
  console.log(allPlans)
  return res.status(200).json(allPlans)
})

// Get a plan by objectId //

app.get('/plans/:id', async (req, res, next) => {
  const { id } = req.params
  const foundPlan = await PlanModel.findById(id)
  
  return res.status(200).json(foundPlan)
})

// Create new plan //

app.post('/plans', async ( req, res ) => {
  const { body: newPlan } = req
  const createdDocument = await PlanModel.create(newPlan)
  return res.status(200).json(createdDocument)
})

// Update an entry //

app.put('/plans/:id', async (req, res) => {
  const { id } = req.params
  const { body: updatedPlan } = req
  const updatedDocument = await PlanModel.findByIdAndUpdate(id, updatedPlan, { new: true })
  return res.status(200).json(updatedDocument)
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