import dotenv from "dotenv";
import express, { application } from "express";
import emailjs from "emailjs-com";
import mongoose from "mongoose";
import { Customer, Product, ImageChunk, Order } from "./schema/schema";
import cors from "cors";
import bodyParser from "body-parser";
import path from 'path'

dotenv.config();
const port = process.env.PORT || 5000;
const userEmail = process.env.USER_EMAIL;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
CURRENT ERROR: 
Access to XMLHttpRequest at 'http://localhost:5000/product' from origin 'http://localhost:3000' has been 
blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
*/
// const corsOptions = {
//   origin: "*",
//   methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
//   optionsSuccessStatus: 200
// }
app.use(cors(/*corsOptions*/));
app.use("/images", express.static(path.join(__dirname, "images")))

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.use(function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*') // CORS header
  next()
})

async function dbConnect() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xxpzv.mongodb.net/Josie?retryWrites=true&w=majority`
  );
  console.log("Now connected to MongoDB...");
}

dbConnect().catch((err) => console.log(err));

// Submit new customer to database
app.post("/customer", async (req: any, res: any) => {
  const newCustomer = new Customer(req.body);
  await newCustomer.save()
  console.log(`Customer saved:\n${newCustomer}`);
});

// Get customer by last name
app.post("/getcustomer", async (req: any, res: any) => {
  console.log(`REQUEST RECIEVED: ${req.body}`);
  const customer = await Customer.find({ lastName: req.body.searchTerm });
  console.log(customer);
  res.send(customer);
});

// Submit new product to database
app.post("/product", async (req: any, res: any) => {
  // res.set('Access-Control-Allow-Origin', '*') // CORS header
  console.log('SUBMITTING NEW PRODUCT...')
  const newProduct = new Product(req.body);
  await newProduct.save()
  console.log(`Product saved:\n${newProduct}`);
});

// Get product by name
app.post("/getproduct", async (req: any, res: any) => {
  console.log(`REQUEST RECIEVED: ${req.body}`);
  const product = await Product.find({ name: req.body.searchTerm });
  console.log(product);
  res.send(product);
});

app.post("/imagechunk", async (req: any, res: any) => {
  const imageChunk = new ImageChunk(req.body)
  await imageChunk.save()
  console.log(`Image Chunk Saved: ${req.body}`)
})

// Post new order
app.post("/order", async (req: any, res: any) => {
  const newOrder = new Order(req.body);
  await newOrder.save()
  console.log(`Order saved:\n${newOrder}`);
});

app.post("/getorder", async (req: any, res: any) => {
  // get order by customer last name
  console.log(`REQUEST RECIEVED: ${req.body}`);
  const order = await Order.find({ lastName: req.body.searchTerm });
  console.log(order);
  res.send(order);
});

// Connect server
app.listen(port, () => console.log(`Now listening on port ${port}`));
