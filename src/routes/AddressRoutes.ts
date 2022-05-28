import * as express from 'express';
const router = express.Router();
import AddressController from '../controllers/AddressController';

/*
 * GET
 */
router.get('/', AddressController.list);

/*
 * GET
 */
router.get('/:id', AddressController.show);

/*
 * POST
 */
router.post('/', AddressController.create);

/*
 * PUT
 */
router.put('/:id', AddressController.update);

/*
 * DELETE
 */
router.delete('/:id', AddressController.remove);

export = router;
