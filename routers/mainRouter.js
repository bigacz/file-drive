import router from 'express';
import mainController from '../controllers/mainController.js';

const mainRouter = router();

mainRouter.get('/login', mainController.getLogin);

mainRouter.post('/login', mainController.postLogin);

mainRouter.get('/register', mainController.getRegister);

mainRouter.post('/register', mainController.postRegister);

mainRouter.get('/upload', mainController.getUpload);

mainRouter.post('/upload', mainController.postUpload);

export default mainRouter;
