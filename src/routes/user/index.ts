import express from 'express';
import OrderRoutes from './OrderRoutes';

const router = express.Router()

router.use('/order', OrderRoutes)

export default router