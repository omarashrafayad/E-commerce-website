import express  from 'express';
import { protect } from '../controller/authController';
import { createCashOrder, deleteOrder, filterOrderForLoggedUser, findAllOrders, findSpecificOrder, updateOrderToDelivered, updateOrderToPaid } from '../controller/ordercontroller';

const router = express.Router();

router.use(protect);

router.route('/:cartId').post(createCashOrder);
router.get('/',filterOrderForLoggedUser,findAllOrders);
router.get('/:id', findSpecificOrder);
router.delete('/:id',deleteOrder);
router.patch('/:id/pay',updateOrderToPaid);
router.patch('/:id/deliver',updateOrderToDelivered);

export default router;