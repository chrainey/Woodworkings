import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  rating: Number,
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

// const ratingSchema = new mongoose.Schema({
//   rating: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now },
//   createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
// })

const planSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  author: { type: String, required: true },
  type: String,
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
})

export default mongoose.model('Plan', planSchema)

