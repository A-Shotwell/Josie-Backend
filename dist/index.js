"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema/schema");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const port = process.env.PORT || 5000;
const userEmail = process.env.USER_EMAIL;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
/*
CURRENT ERROR:
Access to XMLHttpRequest at 'http://localhost:5000/product' from origin 'http://localhost:3000' has been
blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
*/
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });
function dbConnect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xxpzv.mongodb.net/Josie?retryWrites=true&w=majority`);
        console.log("Now connected to MongoDB...");
    });
}
dbConnect().catch((err) => console.log(err));
// Submit new customer to database
app.post("/customer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCustomer = new schema_1.Customer(req.body);
    yield newCustomer
        .save()
        .then(() => console.log(`Customer saved:\n${newCustomer}`));
}));
// Get customer by last name
app.post("/getcustomer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`REQUEST RECIEVED: ${req.body}`);
    const customer = yield schema_1.Customer.find({ lastName: req.body.searchTerm });
    console.log(customer);
    res.send(customer);
}));
// Submit new product to database
app.post("/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    console.log('SUBMITTING NEW PRODUCT...');
    const newProduct = new schema_1.Product(req.body);
    yield newProduct
        .save()
        .then(() => console.log(`Product saved:\n${newProduct}`));
}));
// Get product by name
app.post("/getproduct", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`REQUEST RECIEVED: ${req.body}`);
    const product = yield schema_1.Product.find({ name: req.body.searchTerm });
    console.log(product);
    res.send(product);
}));
// Post new order
app.post("/order", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new schema_1.Order(req.body);
    yield newOrder.save().then(() => console.log(`Order saved:\n${newOrder}`));
}));
app.post("/getorder", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get order by customer last name
    console.log(`REQUEST RECIEVED: ${req.body}`);
    const order = yield schema_1.Order.find({ lastName: req.body.searchTerm });
    console.log(order);
    res.send(order);
}));
// Connect server
app.listen(port, () => console.log(`Now listening on port ${port}`));
