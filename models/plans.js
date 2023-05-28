import mongoose from 'mongoose'

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  author: { type: String, required: true },
  type: String,
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Plan', planSchema)

