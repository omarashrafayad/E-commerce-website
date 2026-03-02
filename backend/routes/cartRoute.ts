import  express  from 'express';
import { protect } from "../controller/authController";
import { addProductToCart, clearCart, getLoggedUserCart, applyCoupon, updateCartItemQuantity, removeSpecificCartItem } from "../controller/cartController";

const router = express.Router();

router.use(protect);
router
    .route('/')
    .post(addProductToCart)
    .get(getLoggedUserCart)
    .delete(clearCart);

router.patch('/applyCoupon', applyCoupon);

router
    .route('/:itemId')
    .patch(updateCartItemQuantity)
    .delete(removeSpecificCartItem);

export default router;