import  express from'express'
import { protect } from '../controller/authController';
import { addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist } from '../controller/wishlistController';

const router = express.Router();

router.route('/').post(protect,addProductToWishlist).get(protect,getLoggedUserWishlist);

router.delete('/:productId',protect, removeProductFromWishlist);

export default  router;