import router from 'express';
import mainController from '../controllers/mainController.js';
import folderRouter from './folderRouter.js';

const mainRouter = router();

mainRouter.use('/folder', folderRouter);

mainRouter.get('/login', mainController.getLogin);

mainRouter.post('/login', mainController.postLogin);

mainRouter.get('/register', mainController.getRegister);

mainRouter.post('/register', mainController.postRegister);

export default mainRouter;
