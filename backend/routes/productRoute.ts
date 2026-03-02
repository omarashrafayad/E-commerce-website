import express  from 'express';
import { createProduct, deleteProduct, getAllProducts, getProduct, resizeProductImages, updateProduct, uploadProductImages } from '../controller/productController';
import { createProductValidator, deleteProductValidator, getProductValidator, updateProductValidator } from '../utils/validator/productValidator';
import reviewRoute from '../routes/reviewRoute'
import { validateProductLogic, validateUpdateProductLogic } from '../middlewares/validateProductLogic';

const router = express.Router();
router.use('/:productId/reviews', reviewRoute);
router.route('/').get(getAllProducts).post(uploadProductImages,resizeProductImages,createProductValidator,validateProductLogic,createProduct);
router.route('/:id').get(getProductValidator,getProduct)
.patch(uploadProductImages,resizeProductImages,updateProductValidator,validateUpdateProductLogic,updateProduct)
.delete(deleteProductValidator,deleteProduct)
export default router;