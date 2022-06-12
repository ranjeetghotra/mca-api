import * as express from 'express';
const router = express.Router();
import CategoryController from '../../controllers/CategoryController';

/*
 * POST
 */
router.post('/', CategoryController.create);

/*
 * PUT
 */
router.put('/:id', CategoryController.update);

/*
 * DELETE
 */
router.delete('/:id', CategoryController.remove);

export = router;
