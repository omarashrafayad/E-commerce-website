import { deleteReviewValidator, getReviewValidator, updateReviewValidator } from './../utils/validator/reviewValidator';
import  express  from 'express';
import { getReviews,createFilterObj,setProductIdAndUserIdToBody, createReview, getReview, updateReview, deleteReview } from '../controller/reviewController';
import { createReviewValidator } from '../utils/validator/reviewValidator';
import { protect } from '../controller/authController';
import { checkReviewDeletePermission, checkReviewExists, checkReviewOwnership } from '../middlewares/validateReviewMiddleware';


const router = express.Router({mergeParams:true})

router.route('/').get(createFilterObj,getReviews)
.post(protect,setProductIdAndUserIdToBody,createReviewValidator,checkReviewExists,createReview)

router.route('/:id').get(getReviewValidator,getReview)
.patch(protect,updateReviewValidator,checkReviewOwnership,updateReview)
.delete(protect,deleteReviewValidator,checkReviewDeletePermission,deleteReview)

export default router;