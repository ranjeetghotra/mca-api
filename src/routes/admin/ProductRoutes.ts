import * as express from 'express';
const router = express.Router();
import ProductController from '../../controllers/ProductController';

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
