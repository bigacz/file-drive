import router from 'express';

import fileController from '../controllers/fileController.js';

const fileRouter = router();

fileRouter.get('/file', fileController.getFolder);

fileRouter.post('/folder', fileController.postFolder);

fileRouter.patch('/folder', fileController.patchFolder);

fileRouter.delete('/folder', fileController.deleteFolder);

export default fileRouter;
