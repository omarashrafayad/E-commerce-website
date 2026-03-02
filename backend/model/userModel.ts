import mongoose, { Document, Types } from "mongoose";
import bcrypt from 'bcryptjs'
export interface IUser extends Document {
    name: string;
    slug?: string;
    type: string;
    phone: string,
    email: string,
    profileImg: string,
    password: string,
    passwordChangedAt: Date,
    passwordResetCode: String | undefined,
    passwordResetExpires: Date | number | undefined,
    passwordResetVerified: Boolean | undefined,
    role: string,
    active: boolean,
    wishlist: Types.ObjectId[];
    addresses: [{
        alias?: string;
        details: string;
        phone: string;
        city: string;
        postalCode: string;
    }]
}
const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        trim: true,
        required: [true, 'name required'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true,
        lowercase: true,
    },
    phone: String,
    profileImg: String,

    password: {
        type: String,
        required: [true, 'password required'],
        minlength: [6, 'Too short password'],
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: {
        type: String,
        enum: ['user', 'manager', 'admin'],
        default: 'user',
    },
    active: {
        type: Boolean,
        default: true,
    },
    wishlist: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
        },
    ],
    addresses: [
        {
            alias: String,
            details: String,
            phone: String,
            city: String,
            postalCode: String,
        },
    ],
}, { timestamps: true })
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});
// userSchema.pre(/^find/, function () {
//     (this as any).populate({
//         path: 'wishlist',
//         select: 'title -_id',
//     });

// });

const setImageURL = (doc: IUser) => {
    if (doc.profileImg) {
        const imgUrl = `${process.env.BASE_URL}/user/${doc.profileImg}`
        doc.profileImg = imgUrl
    }
}

userSchema.post('init', function (doc) {
    setImageURL(doc)
})

userSchema.post('save', function (doc) {
    setImageURL(doc)
})

const userModel = mongoose.model<IUser>('User', userSchema)
export default userModel