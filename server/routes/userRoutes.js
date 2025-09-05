import express from 'express'
import { ClerkWebHooks } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/webhooks',ClerkWebHooks)

export default userRouter