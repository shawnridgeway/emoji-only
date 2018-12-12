// 3p
import * as express from 'express'
import { Request } from 'express-session'

// Project
import models from '../models/index'
import { getUser, getRandomUserName } from '../utils'


/* --- Users Routes --- */
const router = express.Router()
const { User, Message } = models


router.get('/', async (req: Request, res) => {
  // Get the current user and send forward
  const user = await getUser(req, res)
  if (user) {
    return res.status(200).json(user)
  }
  // No user set, make a new one
  const newUser = await User.create({
    name: getRandomUserName()
  })
  if (!newUser) {
    return res.status(500).send()
  }
  req.session.userId = newUser.id
  req.session.save();
  return res.status(200).json(newUser)
})


router.get('/:requestedUserId', async (req, res) => {
  const { requestedUserId } = req.params
  const user = await getUser(req, res)
  // User not authenticated, bail
  if (!user) {
    return res.status(400).send()
  }
  // Get the requested user and send forward
  const requestedUser = await User.findOne({
    where: {
      id: requestedUserId
    }
  })
  if (!requestedUser) {
    return res.status(400).send()
  }
  return res.status(200).json(requestedUser)
})


export default router