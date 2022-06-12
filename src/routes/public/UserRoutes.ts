import * as express from 'express';
const router = express.Router();
import UserController from '../../controllers/UserController';

/*
 * GET
 */
router.get('/', UserController.list);

/*
 * GET
 */
router.get('/:id', UserController.show);

/*
 * POST
 */
router.post('/', UserController.create);

/*
 * PUT
 */
router.put('/:id', UserController.update);

/*
 * DELETE
 */
router.delete('/:id', UserController.remove);

export = router;
