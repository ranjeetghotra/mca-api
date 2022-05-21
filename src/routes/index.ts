import express from 'express';
import UserRoutes from './UserRoutes';
import AuthRoutes from './AuthRoutes';

const router = express.Router()

router.use('/auth', AuthRoutes)
router.use('/users', UserRoutes)

router.get('/', (req, res) => {
    res.send('App working ⚡️');
})

router.use('*', (req, res) => {
    res.status(400).json({
        message: "Route not found"
    })
})

export default router