import express from 'express'
import AgentChat from '../controllers/AgentChat.js'

const router = express.Router()

router.post('/chat', AgentChat.chat)

export default router
