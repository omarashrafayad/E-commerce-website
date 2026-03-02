import  express from'express'
import { addAddress, getLoggedUserAddresses, removeAddress } from '../controller/addressController';

import { protect } from '../controller/authController';
import { addAddressValidator } from '../utils/validator/addressValidator';
const router = express.Router();

router.route('/').post(protect,addAddressValidator,addAddress).get(protect,getLoggedUserAddresses);

router.delete('/:addressId',protect, removeAddress);

export default  router;