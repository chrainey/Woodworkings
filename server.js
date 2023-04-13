/* eslint-disable no-unused-vars */
import express from 'express'

const PORT = 4000
const app = express()

let dogs = [
  {
    name: 'Millie', age: 14, id: 0,
  },
  {
    name: 'Charlie', age: 7, id: 1,
  }
]

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

app.get('/dogs', (req, res, next) => {
  return res.status(200).json(dogs)
})

app.get('/dogs/:id', (req, res, next) => {
  const { id } = req.params
  const foundDog = dogs.find(dog => dog.id === parseInt(id))
  if (!foundDog) {
    return res.status(404).json({ message: `Dog with ID ${id} not found.` })
  } 
  return res.status(200).json(foundDog)
  
})

// Create Dog

app.post('/dogs', (req, res, next) => {
  if (Object.keys(req.body).every(key => ['name', 'age', 'id'].includes(key))) {
    dogs.push(req.body)
    return res.status(200).send(`Dog with name ${req.body.name} has been added`)
  }
  next()
})

// Update Dog

app.put('/dogs/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const newProps = req.body
  dogs = dogs.map(dog => {
    if (dog.id === id) {
      const updatedDog = { ...dog, ...newProps }
      return updatedDog
    } else {
      return dog
    }
  })
  return res.status(202).json({ message: 'Dog has been updated' })
})

// Delete Dog

app.delete('/dogs/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  dogs = dogs.filter(dog => dog.id !== id)
  return res.status(200).send(`Dog with id ${id} has been deleted`)
})

//Error Handling to catch all other enpoints

// app.use((req, res, next) => {
//   return res.status(404).send('Endpoint not found.')
// })

// Setting our local host port //
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`)
})

console.log('Hello from node environment')