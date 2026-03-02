import express from 'express';
import {
    changeUserPassword,
    createUser,
    deleteLoggedUserData,
    deleteUser,
    getAllUers,
    getLoggedUserData,
    getUser,
    resizeUserImage,
    updateLoggedUserData,
    updateLoggedUserPassword,
    updateUser,
    uploadUserImage,
} from '../controller/userController';

import {
    createUserValidator,
    deleteUserValidator,
    getUserValidator,
    updateUserValidator,
    changeUserPasswordValidator,
    updateLoggedUserValidator,
} from '../utils/validator/userValidator';

import { protect } from '../controller/authController';
import { checkEmailExists, checkCurrentPassword } from '../middlewares/validatorUserMiddleware';

const router = express.Router();

router.get('/getMe', protect, getLoggedUserData, getUser);
router.patch(
    '/updateMe',
    protect,
    uploadUserImage,
    resizeUserImage,
    updateLoggedUserValidator,
    checkEmailExists,
    updateLoggedUserData
);
router.patch(
    '/changeMyPassword',
    protect,
    changeUserPasswordValidator,
    checkCurrentPassword,
    updateLoggedUserPassword
);
router.delete('/deleteMe', protect, deleteLoggedUserData);

router
    .route('/')
    .get( getAllUers)
    .post(
        uploadUserImage,
        resizeUserImage,
        createUserValidator,
        checkEmailExists,
        createUser
    );

router
    .route('/:id')
    .get(getUserValidator,getUser)
    .patch(updateUserValidator, checkEmailExists, updateUser)
    .delete(deleteUserValidator, deleteUser);


router.patch(
    '/changePassword/:id',
    changeUserPasswordValidator,
    checkCurrentPassword,
    changeUserPassword
);

export default router;
