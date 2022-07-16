import express from 'express';
import UserRoutes from './UserRoutes';
import CategoryRoutes from './CategoryRoutes';
import ProductRoutes from './ProductRoutes';
import FileRoutes from './FileRoutes';
import OrderRoutes from './OrderRoutes';
import ContactRoutes from './ContactRoutes';
import DashboardRoutes from './DashboardRoutes';

const router = express.Router()

router.use('/user', UserRoutes)
router.use('/category', CategoryRoutes)
router.use('/product', ProductRoutes)
router.use('/file', FileRoutes)
router.use('/order', OrderRoutes)
router.use('/contact', ContactRoutes)
router.use('/dashboard', DashboardRoutes)

export default router