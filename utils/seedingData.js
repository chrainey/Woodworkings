import bcrypt from 'bcrypt'

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

const users = {
  admin: {
    email: 'admin@gmails.com',
    userName: 'admin',
    password: await hashPassword('1234'),
    role: 'admin',
    _id: '630520d30b7f7a4f9473aa66',
  },
  user: {
    email: 'user@gmails.com',
    userName: 'user',
    password: await hashPassword('1234'),
    role: 'admin',
    _id: '6473a8ac105a9cd048528dce',
  },
}

const plans = [
  {
    name: 'Bedroom Side Table',
    description: 'Decorative small bedside table',
    price: 40,
    author: 'Chris Rainey',
    type: 'Table',
  },
  {
    name: 'Workbench',
    description: 'Simple, long garage workbench',
    price: 20,
    author: 'Chris Rainey',
    type: 'Table',
  },
  {
    name: 'Kitchen Chair',
    description: 'Lightweight standard kitchen chair',
    price: 15,
    author: 'Chris Rainey',
    type: 'Chair',
    createdBy: '64733f1fedf3abae32b3ec71',
  },
  {
    name: 'Storage Cabinet',
    description: 'Small, two-door, hinged cabinet with drawer',
    price: 25,
    author: 'Chris Rainey',
    type: 'Cabinet',
  },
  {
    name: 'Battery Cabinet',
    description: 'Wall-mounted, two-door storage cabinet for tool batteries',
    price: 25,
    author: 'Chris Rainey',
    type: 'Cabinet',
  },
  {
    name: 'TV food table',
    description: 'Roller, small table for eating meals in front of TV',
    price: 27,
    author: 'Chris Rainey',
    type: 'Table',
  }
].map((plans) => ({
  ...plans, createdBy: users.user._id,
}))

export default { plans, users }