import auth from '../Auth/authUser.js'

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token
    console.log(token)

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        message: 'Access denied. Token missing'
      })
    }

    // ✅ Verify token
    const decoded = await auth.verifyToken(token)
    console.log(decoded)

    // Attach user to request
    req.user = decoded

    // Optional: refresh cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true, // 🔥 REQUIRED by browser
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid or expired token'
    })
  }
}

export default authMiddleware
