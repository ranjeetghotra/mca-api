import * as express from 'express';
const router = express.Router();
import ContactController from '../../controllers/ContactController';

/*
 * GET
 */
router.get('/', ContactController.list);

/*
 * GET
 */
// router.get('/:id', ContactController.show);

/*
 * POST
 */
// router.post('/', ContactController.create);

/*
 * PUT
 */
// router.put('/:id', ContactController.update);

/*
 * DELETE
 */
// router.delete('/:id', ContactController.remove);

export = router;
