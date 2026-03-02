import mongoose, { Document, Schema, Types } from 'mongoose';
import slugify from 'slugify';

export interface ISubCategory extends Document {
    name: string;
    slug?: string;
    category: Types.ObjectId;
}

const subCategorySchema = new Schema<ISubCategory>(
    {
        name: {
            type: String,
            trim: true,
            unique: [true, 'SubCategory must be unique'],
            minlength: [2, 'Too short SubCategory name'],
            maxlength: [32, 'Too long SubCategory name'],
            required: [true, 'SubCategory name is required'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'SubCategory must belong to a parent category'],
        },
    },
    { timestamps: true }
);

// subCategorySchema.pre<ISubCategory>('save', async function () {
//     if (this.isModified('name')) {
//         this.slug = slugify(this.name, { lower: true });
//     }
// });

// subCategorySchema.pre(/^find/,function(){
//     (this as any).populate({
//         path:"category",
//         select:"name image -_id"
//     })
// })

const SubCategoryModel = mongoose.model<ISubCategory>('SubCategory', subCategorySchema);
export default SubCategoryModel;
