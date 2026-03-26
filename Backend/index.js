// index.js

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './config/mongodb.js'
import server from './app.js'

const PORT = process.env.PORT || 5000

const start = async () => {
  // ✅ Connect to MongoDB FIRST, then start server
  await connectDB()

  server.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`)
    console.log(`📦 Environment : ${process.env.NODE_ENV || 'development'}`)
    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(`📋  USER API ROUTES`)
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(
      `  🟢 POST   /api/user/send-otp        → Send OTP (registration)`
    )
    console.log(`  🟢 POST   /api/user/verify-otp       → Verify OTP`)
    console.log(
      `  🟢 POST   /api/user/register         → Complete registration`
    )
    console.log(`  🟢 POST   /api/user/login            → Login (sets cookie)`)
    console.log(
      `  🟢 GET    /api/user/me               → Get my profile [Protected]`
    )
    console.log(
      `  🟢 POST   /api/user/send-otpFor      → Send OTP (forgot password)`
    )
    console.log(
      `  🟢 POST   /api/user/verify-otpfor    → Verify OTP (forgot password)`
    )
    console.log(
      `  🟢 POST   /api/user/resetpass        → Reset password [Protected]`
    )
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(
      `  🏥 GET    http://localhost:${PORT}/MockPrep               → Health check`
    )
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`)
    console.log(`\n  🍪 Auth  : Cookie-based JWT  (httpOnly, 7 days)`)
    console.log(`  🔒 Lock  : Protected routes require login cookie\n`)
  })

  // ── Graceful shutdown ─────────────────────────────────────────────────────
  const shutdown = signal => {
    console.log(`\n${signal} received — shutting down...`)
    server.close(() => {
      console.log('Server closed.')
      process.exit(0)
    })
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}

start()
