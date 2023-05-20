import PlanModel from '../models/plans.js'

// Get all plans //
const getAll = async (req, res) => {
  const allPlans = await PlanModel.find()
  console.log(allPlans)
  return res.status(200).json(allPlans)
}

// Get a specific plan //
const getPlan = async (req, res, next) => {
  const { id } = req.params
  try {
    const foundPlan = await PlanModel.findById(id)
    if (!foundPlan) {
      return res.status(404).json({ message: `Plan with id ${id} could not be found.` })
    }
    return res.status(200).json(foundPlan)
  } catch (error) {
    next(error)
  }
}

// Create new Plan //
const newPlan = async (req, res, next) => {
  const { body: newPlan } = req
  try {
    const createdDocument = await PlanModel.create(newPlan)
    return res.status(200).json(createdDocument)
  } catch (error) {
    next(error)
  }
}

// Update an entry //
const update = async (req, res, next) => {
  const { id } = req.params
  const { body: updatedPlan } = req
  try {
    const updatedDocument = await PlanModel.findByIdAndUpdate(id, updatedPlan, { new: true })
    if (!updatedDocument) {
      return res.status(404).json({ message: `Plan with id ${id} cannot be found` })
    } else {
      return res.status(200).json(updatedDocument)
    }
  } catch (error) {
    next(error)
  }
} 

// DELETE an entry //
const remove = async (req, res, next) => {
  const { id } = req.params
  try {
    const foundResource = await PlanModel.findById(id)
    if (!foundResource) {
      return res.status(404).json(`Plan with id ${id} does not exist.`)
    }
    const deletedPlan = await PlanModel.findByIdAndDelete(id)
    return res.status(200).json({ 
      message: `Plan with ID ${id} has been deleted`,
      deletedPlan,
    })
  } catch (error) {
    next(error)
  }
}
export default {
  getAll,
  getPlan,
  newPlan,
  update,
  remove,
}