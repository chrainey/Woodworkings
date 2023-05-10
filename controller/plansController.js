import PlanModel from '../models/plans.js'

// Get all plans //
const getAll = async (req, res) => {
  const allPlans = await PlanModel.find()
  console.log(allPlans)
  return res.status(200).json(allPlans)
}

// Get a specific plan //
const getPlan = async (req, res) => {
  const { id } = req.params
  const foundPlan = await PlanModel.findById(id)
  return res.status(200).json(foundPlan)
}

// Create new Plan //
const post = async (req, res) => {
  const { body: newPlan } = req
  const createdDocument = await PlanModel.create(newPlan)
  return res.status(200).json(createdDocument)
}

export default {
  getAll,
  getPlan,
  post,
}