// Project
import models from './models/index'


/* --- User Utils --- */
const { User } = models
const userNames = [
  '🐮', '🐔', '🐷', '🐶', '🐱', '🐭', '🐻', '🐴', '🐵', '🐸', '🦁', '🐰', '🐨', '🐧', '🐼',
  '🐯', '🐹', '🐺', '🐗', '🦄', '🐦', '🐤', '🐟', '🐠', '🦀', '🐝', '🐌', '🐍', '🐳', '🕷'
]

async function getUser(req, res) {
  const id = req.session.userId
  if (!id) {
    return null
  }
  const user = await User.findOne({
    where: {
      id
    }
  })
  if (!user) {
    return null
  }
  return user
}

function getRandomUserName() {
  return userNames[Math.floor(Math.random() * userNames.length)]
}


export {
  getUser,
  getRandomUserName
} 