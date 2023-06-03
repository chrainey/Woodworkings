import PlanModel from '../models/plans.js'

const create = async (req, res, next) => {
  const { planId } = req.params
  const { body: newComment } = req
  console.log(newComment)
  try {
    const plan = await PlanModel.findById(planId)
    if (!plan) {
      return res.status(404).json({ message: `Plan with ${planId} not found.` })
    }
    plan.comments.push({ ...newComment, createdBy: req.currentUser.id })
    await plan.save()
    console.log(req.currentUser.id)
    return res.status(200).json({ message: 'Endpoint is working!' })
  } catch (error) {
    next(error)
  }
}

export default { create }