import { forgotPasswordValidator, loginValidator, resetCodeValidator, resetPasswordValidator } from './../utils/validator/authValidator';
import express from 'express';
import { signUpValidator } from '../utils/validator/authValidator';
import { forgotPassword, login, resetPassword, signUp, verifyPassResetCode } from '../controller/authController';
import { checkEmailExists } from '../middlewares/validatorUserMiddleware';


const router = express.Router();

router.route('/signup').post(signUpValidator,checkEmailExists,signUp)
router.route('/login').post(loginValidator,login)
router.post('/forgotPassword',forgotPasswordValidator, forgotPassword);
router.post('/verifyResetCode',resetCodeValidator, verifyPassResetCode);
router.patch('/resetPassword', resetPasswordValidator,resetPassword);

export default router;
