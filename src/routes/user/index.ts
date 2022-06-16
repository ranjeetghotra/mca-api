import express from 'express';
import OrderRoutes from './OrderRoutes';
import AddressRoutes from './AddressRoutes';

const router = express.Router()

router.use('/order', OrderRoutes)
router.use('/address', AddressRoutes)

export default router