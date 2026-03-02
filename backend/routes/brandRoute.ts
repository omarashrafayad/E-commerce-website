import express from 'express';
import { createBrand, deleteBrand, getBrand, getBrands, resizeBrandImage, updateBrand, uploadBrandImage } from '../controller/brandController';
import { createBrandValidator, deleteBrandValidator, getBrandValidator, updateBrandValidator } from '../utils/validator/brandValidator';

const router = express.Router();

router.route('/').get(getBrands).post(uploadBrandImage,resizeBrandImage,createBrandValidator,createBrand);
router
    .route('/:id')
    .get(getBrandValidator,getBrand)
    .patch(updateBrandValidator,updateBrand)
    .delete(deleteBrandValidator,deleteBrand);

    export default router;
