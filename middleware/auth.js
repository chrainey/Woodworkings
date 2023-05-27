import jwt from 'jsonwebtoken'
import CONSTS from './../consts.js'
import UserModel from '../models/user.js'

const auth = async (req, res, next) => {
  console.log(req.headers)
  const rawToken = req.headers.authorization

  if (!rawToken) {
    res.status(401).json({ message: 'Unauthorized - No token provided.' })
  }
  const token = rawToken.split(' ')[1]

  const decodedToken = jwt.verify(token, CONSTS.JWT_SECRET)
  const authUser = await UserModel.findOne({ userName: decodedToken.userName })
  if (!authUser) {
    return res.status(401).json({ message: 'Token linked to User that no longer exists' })
  }
  req.currentUser =  authUser
  next()
}

export default auth