import * as express from 'express';
const router = express.Router();
import ProductController from '../controllers/ProductController';

/*
 * GET
 */
router.get('/', ProductController.list);

/*
 * GET
 */
router.get('/:id', ProductController.show);

/*
 * POST
 */
router.post('/', ProductController.create);

/*
 * PUT
 */
router.put('/:id', ProductController.update);

/*
 * DELETE
 */
router.delete('/:id', ProductController.remove);

export = router;
