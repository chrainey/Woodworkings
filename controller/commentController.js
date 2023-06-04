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

    const someCommentIsRated = plan.comments.some(
      (comment) =>
        comment.createdBy.toString() === req.currentUser.id && comment.rating
    )
    if (req.body.rating && someCommentIsRated) {
      return res.status(403).json({ message: 'You already rated this plan.' })
    }
    const newComment = { ...req.body, createdBy: req.currentUser.id }
    plan.comments.push(newComment)
    await plan.save()
    console.log(req.currentUser.id)
    return res.status(200).json({ message: 'Comment created.', createdComment: newComment })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  const { planId, commentId } = req.params
  const updatedComment = req.body
  const { id: userId } = req.currentUser
  try {
    const plan = await PlanModel.findById(planId)
    const commentToUpdate = plan.comments.find((comment) => comment.id === commentId)
    if (commentToUpdate.createdBy.toString() !== userId && req.currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden. Not admin or user who created this comment.' })
    }
    plan.comments = plan.comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, ...updatedComment }
      } else {
        return comment
      }
    })
    await plan.save()
    return  res.status(200).json({
      message: 'Comment has been updated.', 
      updatedComment: plan.comments.find(
        (comment) => comment.id === commentId
      ),
    })

  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  const { planId, commentId } = req.params
  const { id: userId } = req.currentUser
  try {
    const plan = await PlanModel.findById(planId)
    const commentToDelete = plan.comments.find((comment) => comment.id === commentId)
    if (commentToDelete.createdBy.toString() !== userId && req.currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden. Not admin or user who created this comment.' })
    }
    plan.comments = plan.comments.filter(comment => comment.id.toString() !== commentId)
    const updatedPlan = await plan.save()
    return res.status(200).json({ message: 'Comment successfully deleted', updatedComments: updatedPlan.comments })

  } catch (error) {
    next(error)
  }
}

export default { create, remove, update }