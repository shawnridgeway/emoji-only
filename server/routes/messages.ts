// 3p
import * as express from 'express'

// Project
import models from '../models/index'
import { getUser } from '../utils'
// import { onlyEmoji } from 'emoji-utils'


/* --- Messages Routes --- */
const router = express.Router()
const { User, Message } = models


router.get('/', async (req, res) => {
  // Get latest messages
  const messages = await Message.findAll({
    limit: 20,
    order: [[ 'createdAt', 'DESC' ]],
    include: [{
      model: User,
      as: 'author',
    }]
  })
  if (!messages) {
    return res.status(500).send()
  }
  return res.status(200).json(messages)
});


router.post('/', async (req, res) => {
  // User not authenticated, bail
  const user = await getUser(req, res);
  if (!user) {
    return res.status(400).send('No user')
  }
  // Invalid body, bail
  const { body } = req.body;
  if (!body) {
    return res.status(400).send('No body')
  }
  // // Ensure message has emoji characters only
  // if (onlyEmoji(body) !== body) {
  //   return res.status(400).send('Non emoji characters found');
  // }
  const newMessageDraft = { 
    authorId: user.id, 
    body: body, 
    author: {
     Type: 'User',
     Name: 'MealTest1'
   } 
  }
  // Save message to storage 
  const newMessage = await Message.create(newMessageDraft)
  if (!newMessage) {
    return res.status(500).send()
  }
  // Get saved message
  const savedMessage = await Message.findOne({
    where: { id: newMessage.id },
    include: [{
      model: User,
      as: 'author',
    }]
  }) 
  if (!savedMessage) {
    return res.status(500).send()
  }
  // Emit to ws
  (global as any).io.emit('new-message', savedMessage)
  return res.status(200).json(savedMessage)
});


export default router
