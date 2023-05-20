import UserModel from '../models/user.js'
import bcrypt from 'bcrypt'

const register = async (req, res, next) => {
  const { body: newUser } = req
  const emailExists = await UserModel.findOne({ email: newUser.email })
  if (emailExists) {
    return res.status(400).json({ message: 'User with this email already exists.' })
  }
  const userExists = await UserModel.findOne({ userName: newUser.userName })
  if (userExists) {
    return res.status(400).json({ message: 'User with this username already exists.' })
  }
  await UserModel.create(newUser)

  if (newUser.password !== newUser.confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' })
  }

  const salt = await bcrypt.genSalt(10)
}

export default { register }