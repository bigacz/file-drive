import router from 'express';

import folderController from '../controllers/folderController.js';

const folderRouter = router();

folderRouter.get('/', folderController.getFolder);

folderRouter.post('/', folderController.postFolder);

folderRouter.patch('/', folderController.patchFolder);

folderRouter.delete('/', folderController.deleteFolder);

export default folderRouter;
