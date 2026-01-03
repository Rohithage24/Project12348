import express from 'express'
import AgentChat from '../controllers/AgentChatQ.js'

const router = express.Router()

router.post('/chat', AgentChat.chat)

export default router
