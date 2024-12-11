const jwt = require('jsonwebtoken')

require('dotenv').config()

const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"] || req.headers["Authorization"]
    if (!token) return res.status(403).send('No token ')
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    }
    catch (e) {
        return res.status(500).send("error ", e)
    }
}

module.exports = authMiddleware