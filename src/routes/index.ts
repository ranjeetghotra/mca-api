import express from 'express';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './Admin';

const router = express.Router()

router.use('/auth', AuthRoutes)
router.use('/', AdminRoutes)

router.get('/', (req, res) => {
    res.send('App working ⚡️');
})

router.use('*', (req, res) => {
    res.status(400).json({
        message: "Route not found"
    })
})

export default router