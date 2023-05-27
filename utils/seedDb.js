import connectToDb from './db.js'
import PlanModel from '../models/plans.js'
import seedingData from './seedingData.js'
import mongoose from 'mongoose'

const seed = async () => {
  await connectToDb()
  console.log('Database Connected!')

  await mongoose.connection.db.dropDatabase()
  // await mongoose.connection.db.dropCollection('plans')
  const dbPlans = await PlanModel.create(seedingData)
  console.log(`${dbPlans.length} plans have been created successfully in the database.`)

  console.log(`Going to disconnect from db ${mongoose.connection.name}`)
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }
  console.log('All done. Database has been reset')
}

seed()