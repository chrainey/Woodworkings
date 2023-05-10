import express from 'express'
import plansController from './controller/plansController.js'

//Instatiate an express router object
const router = express.Router()

// define all routes for plans endpoints //
router.route('/plans').get(plansController.getAll).post(plansController.post)

router.route('/plans/:id').get(plansController.getPlan)

export default router