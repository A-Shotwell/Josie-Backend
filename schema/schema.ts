import mongoose from 'mongoose'
import { ObjectId } from 'mongodb'
const { Schema } = mongoose;

// Can cart data be stored on the front end?
// const cartSchema = new Schema({
//     cartItems: [
//         {
//             name: String,
//             variant: String,
//             price: Number,
//             count: Number         
//         }
//     ]
// })

// const productSchema = new Schema({
//     name: String,
//     description: String,
//     variants: [{
//         name: String,
//         description: String,
//         price: Number,
//         inStock: Number,
//         images: [String] // base64 encoded
//     }]
// })

const productSchema = new Schema({
    product: String,
    productDesc: String,
    variant: String,
    variantDesc: String,
    imagesFiles: [String], // file names to search for base64 string chunks
    price: Number,
    inStock: Number,
})

const imageChunkSchema = new Schema({
    series: String,
    part: Number,
    data: String
})

const orderSchema = new Schema({
    firstName: String,
    lastName: String,
    orderNumber: String,
    createdAt: Date,
    cartItems: [{
        name: String,
        variant: String,
        price: Number,
        count: Number         
    }],
    tax: Number,
    total: Number,
    paymentMethod: String,
    card: {
        name: String,
        cardNumber: String,
        expiration: String,
        validationCode: String
    },
    billedTo: {
        streetAddress: String,
        suiteOrApt: String,
        poBox: String,
        city: String,
        zipCode: String
    },
    shippedTo: {
        streetAddress: String,
        suiteOrApt: String,
        poBox: String,
        city: String,
        zipCode: String
    },
    fulfilled: Boolean
})

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    // cookie: String, *May be unnecessary if able to store/retrieve from the front end
    isSubscribed: Boolean,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ]
})

const blogSchema = new Schema({
    title: String,
    createdAt: Date,
    text: String,
    images: [Buffer]
})

const Customer = mongoose.model('Customer', customerSchema)
// const Cart = mongoose.model('Cart', cartSchema)
const Product = mongoose.model('Product', productSchema)
const ImageChunk = mongoose.model('ImageChunk', imageChunkSchema)
const Order = mongoose.model('Order', orderSchema)
const Blog = mongoose.model('Blog', blogSchema)

export { /*Cart,*/ Product, ImageChunk, Order, Customer, Blog }