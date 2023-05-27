import express from 'express'
import plansController from './controller/plansController.js'
import userController from './controller/userController.js'
import auth from './middleware/auth.js'

//Instantiate an express router object
const router = express.Router()

router.route('/').get((req, res) => res.status(200).send('API is running'))

// Plans Routes //
router.route('/plans').get(plansController.getAll).post(auth, plansController.newPlan)

router
  .route('/plans/:id')
  .get(plansController.getPlan)
  .put(plansController.update)
  .delete(plansController.remove)

// Auth routes //

router.route('/register').post(userController.register)
router.route('/login').post(userController.login)

export default router