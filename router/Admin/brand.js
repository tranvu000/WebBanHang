import express from 'express';
import authMiddleware from '../../app/Middlewares/AuthMiddleware.js';
import BrandController from '../../app/Controller/Admin/BrandController.js';
import { 
  storeUpdateBrandValidation, 
  indexBrandValidation
} from '../../app/Validations/Admin/BrandValidation.js'
import uploadImageMiddleware from '../../app/Middlewares/UploadImageMiddleware.js';
import { uploadLogoFirebaseMiddleware } from '../../app/Middlewares/UploadFirebaseMiddleware.js';

const brandRouter = (app) => {
  const router = express.Router();
  const brandController = new BrandController();

  router.use(authMiddleware);

  router.post('/', uploadImageMiddleware.single('logo'), uploadLogoFirebaseMiddleware, storeUpdateBrandValidation, brandController.store)
  router.get('/', indexBrandValidation, brandController.index);
  router.get('/:brandId', brandController.show);
  router.put('/:brandId',uploadImageMiddleware.single('logo'), uploadLogoFirebaseMiddleware, storeUpdateBrandValidation, brandController.update)
  router.delete('/:brandId', brandController.destroy);

  app.use('/admin/brand', router)
};

export default brandRouter;