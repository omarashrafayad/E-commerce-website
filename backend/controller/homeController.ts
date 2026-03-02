import  asyncHandler  from 'express-async-handler';
import CategoryModel from "../model/categoryModel";
import productModel from "../model/productsModel";

export const getHomeData = asyncHandler(async (req, res) => {

    const shopByCategory = await CategoryModel.find().limit(3);

    const newCollections = await productModel
        .find()
        .sort("-createdAt")
        .limit(3);

    const trendingNow = await productModel
        .find()
        .sort("-ratingsAverage")
        .limit(4);

    res.status(200).json({
        shopByCategory,
        newCollections,
        trendingNow,
    });
});
