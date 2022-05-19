"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = exports.Customer = exports.Order = exports.ImageChunk = exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
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
const productSchema = new Schema({
    name: String,
    description: String,
    variants: [{
            name: String,
            description: String,
            price: Number,
            inStock: Number,
            images: [String] // base64 encoded
        }]
});
const imageChunkSchema = new Schema({
    product: String,
    variant: String,
    series: String,
    part: Number,
    data: String
});
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
});
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
});
const blogSchema = new Schema({
    title: String,
    createdAt: Date,
    text: String,
    images: [Buffer]
});
const Customer = mongoose_1.default.model('Customer', customerSchema);
exports.Customer = Customer;
// const Cart = mongoose.model('Cart', cartSchema)
const Product = mongoose_1.default.model('Product', productSchema);
exports.Product = Product;
const ImageChunk = mongoose_1.default.model('ImageChunk', imageChunkSchema);
exports.ImageChunk = ImageChunk;
const Order = mongoose_1.default.model('Order', orderSchema);
exports.Order = Order;
const Blog = mongoose_1.default.model('Blog', blogSchema);
exports.Blog = Blog;
