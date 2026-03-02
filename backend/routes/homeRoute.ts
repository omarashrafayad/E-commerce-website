import express from 'express';
import { getHomeData } from '../controller/homeController';

const router = express.Router();

router.route('/').get(getHomeData)


export default router;
