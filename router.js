import express from 'express'
import plansController from './controller/plansController.js'
import userController from './controller/userController.js'

//Instantiate an express router object
const router = express.Router()

router.route('/').get((req, res) => res.status(200).send('API is running'))

// Plans Routes //
router.route('/plans').get(plansController.getAll).post(plansController.newPlan)

router
  .route('/plans/:id')
  .get(plansController.getPlan)
  .put(plansController.update)
  .delete(plansController.remove)

// Auth routes //

router.route('/register').post(userController.register)

export default router