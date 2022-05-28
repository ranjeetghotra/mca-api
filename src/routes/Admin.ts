import express from 'express';
import UserRoutes from './UserRoutes';
import CategoryRoutes from './CategoryRoutes';
import ProductRoutes from './ProductRoutes';
import FileRoutes from './FileRoutes';
import OrderRoutes from './OrderRoutes';

const router = express.Router()

router.use('/users', UserRoutes)
router.use('/category', CategoryRoutes)
router.use('/product', ProductRoutes)
router.use('/file', FileRoutes)
router.use('/order', OrderRoutes)

export default router