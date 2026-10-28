import router from 'express';
import mainController from '../controllers/mainController.js';
mainController;

const mainRouter = router();

mainRouter.get('/login', mainController.getLogin);

mainRouter.post('/login', mainController.postLogin);

mainRouter.get('/register', mainController.getRegister);

mainRouter.post('/register', mainController.postRegister);

export default mainRouter;
