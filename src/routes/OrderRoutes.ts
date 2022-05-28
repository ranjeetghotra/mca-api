import * as express from 'express';
const router = express.Router();
import OrderController from '../controllers/OrderController';

/*
 * GET
 */
router.get('/', OrderController.list);

/*
 * GET
 */
router.get('/:id', OrderController.show);

/*
 * POST
 */
router.post('/', OrderController.create);

/*
 * PUT
 */
router.put('/:id', OrderController.update);

/*
 * DELETE
 */
router.delete('/:id', OrderController.remove);

export = router;
