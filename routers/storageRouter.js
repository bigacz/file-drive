import router from 'express';
import storageController from '../controllers/storageController.js';

import multer from 'multer';

const storageRouter = router();

storageRouter.get('/', storageController.getIndex);

storageRouter.post('/', storageController.postIndex);

export default storageRouter;
