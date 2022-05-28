import * as express from 'express';
const router = express.Router();
import CategoryController from '../controllers/CategoryController';

/*
 * GET
 */
router.get('/', CategoryController.list);

/*
 * GET
 */
router.get('/:id', CategoryController.show);

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
