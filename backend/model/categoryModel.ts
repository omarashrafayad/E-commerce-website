import mongoose, { Document, Schema, Types } from 'mongoose';
import slugify from 'slugify';

export interface ICategory extends Document {
    name: string;
    slug?: string;
    image: string;
}

const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: [true, 'Category required'],
            unique: [true, 'Category must be unique'],
            minlength: [3, 'Too short category name'],
            maxlength: [32, 'Too long category name'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        image: String,
    },
    { timestamps: true }
);

const setImageURL = (doc:ICategory) =>{
    if(doc.image){

        const imgUrl = `${process.env.BASE_URL}/categories/${doc.image}`
        doc.image = imgUrl
    }
}

categorySchema.post('init',function(doc){
    setImageURL(doc)
})

categorySchema.post('save',function(doc){
    setImageURL(doc)
})

const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);
export default CategoryModel;
