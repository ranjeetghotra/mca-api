import * as express from 'express';
const router = express.Router();
import FileController from '../controllers/FileController';

router.post('/upload', FileController.upload);

export = router;
