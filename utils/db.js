import mongoose from 'mongoose'

const connectToDb = async () => {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  return mongoose.connect('mongodb://localhost:27017/plans', opts)
}

export default connectToDb