import express from 'express';
import authMiddleware from '../../app/Middlewares/AuthMiddleware.js';
import BrandController from '../../app/Controller/Admin/BrandController.js';
import { 
  storeUpdateBrandValidation, 
  indexBrandValidation
} from '../../app/Validations/Admin/BrandValidation.js'
import { uploadLogoMiddleware } from '../../app/Middlewares/UploadImageMiddleware.js';

const brandRouter = (app) => {
  const router = express.Router();
  const brandController = new BrandController();

  router.use(authMiddleware);

  router.post('/', uploadLogoMiddleware.single('logo'),storeUpdateBrandValidation, brandController.store);
  router.get('/', indexBrandValidation, brandController.index);
  router.get('/:brandId', brandController.show);
  router.put('/:brandId', uploadLogoMiddleware.single('logo'),storeUpdateBrandValidation, brandController.update);
  router.delete('/:brandId', brandController.destroy);

  app.use('/admin/brand', router)
};

export default brandRouter;
