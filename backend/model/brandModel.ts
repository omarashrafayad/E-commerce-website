
import mongoose, { Document, Schema, Types } from 'mongoose';
import slugify from 'slugify';

export interface IBrand extends Document {
    name: string;
    slug?: string;
    image: string;
}

const brandSchema = new Schema<IBrand>(
    {
        name: {
            type: String,
            required: [true, 'Brand required'],
            unique: [true, 'Brand must be unique'],
            minlength: [3, 'Too short brand name'],
            maxlength: [32, 'Too long brand name'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        image: String,
    },
    { timestamps: true }
);

// brandSchema.pre<IBrand>('save', function () {
//     if (this.isModified('name')) {
//         this.slug = slugify(this.name, { lower: true });
//     }
// });

const setImageURL = (doc:IBrand) =>{
    if(doc.image){

        const imgUrl = `${process.env.BASE_URL}/brands/${doc.image}`
        doc.image = imgUrl
    }
}

brandSchema.post('init',function(doc){
    setImageURL(doc)
})

brandSchema.post('save',function(doc){
    setImageURL(doc)
})

const BrandModel = mongoose.model<IBrand>('Brand', brandSchema);
export default BrandModel;
