import express from 'express';
import AuthRoutes from './AuthRoutes';
import AdminRoutes from './admin';
import UserRoutes from './user';
import PublicRoutes from './public';
import Auth from '../middleware/auth';

const router = express.Router()

router.use('/auth', AuthRoutes)
router.use('/', Auth.publicJWT, PublicRoutes)
router.use('/', Auth.userAuthJWT, UserRoutes)
router.use('/', Auth.adminAuthJWT, AdminRoutes)

router.get('/', (req, res) => {
    res.send('App working ⚡️');
})

router.use('*', (req, res) => {
    res.status(400).json({
        message: "Route not found"
    })
})

export default router