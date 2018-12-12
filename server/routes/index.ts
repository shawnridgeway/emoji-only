// 3p
import * as express from 'express'

// Project
import users from './users'
import messages from './messages'


/* --- Main Router --- */
const router = express.Router();

router.use('/users', users)
router.use('/messages', messages)


export default router