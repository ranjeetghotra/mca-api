import jwt from "jsonwebtoken";

export = {
    userAuthJWT: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization
            const user = await decodeJWT(authHeader)
            req.user = user
            next()
        } catch (err) {
            return res.status(403).json({ code: 403, message: 'Authentication failed', errors: [err?.message || err] })
        }
    },
    adminAuthJWT: async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization
            const user = await decodeJWT(authHeader)
            if(user.role !== 2) {
                throw Error('Permissions required')
            }
            req.user = user
            next()
        } catch (err) {
            return res.status(403).json({ code: 403, message: 'Authentication failed', errors: [err?.message || err] })
        }
    }
}

async function decodeJWT(authHeader) {
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        return jwt.verify(token, process.env.JWT_SECRET)
    } else {
        throw Error('Token missing')
    }
}