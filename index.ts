import dotenv from "dotenv";
import express, { application } from "express";
import emailjs from "emailjs-com";
import mongoose from "mongoose";
import { Customer, Product, Order } from "./schema/schema";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const port = process.env.PORT || 4000;
const userEmail = process.env.USER_EMAIL;

const app = express();
app.use(express.json());
app.use(bodyParser.json()); // Throwing error: "body-parser deprecated undefined extended: provide extended option"
app.use(bodyParser.urlencoded());
app.use(cors());

async function dbConnect() {
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xxpzv.mongodb.net/Josie?retryWrites=true&w=majority`
  );
  console.log("Now connected to MongoDB...");
}

dbConnect().catch((err) => console.log(err));

// MIDDLEWARE ???
// app.use((req, res, next) => {
//     // console.log('MIDDLEWARE')
//     next()
// })

// Submit new customer to database
app.post("/customer", async (req: any, res: any) => {
  const newCustomer = new Customer(req.body);
  await newCustomer
    .save()
    .then(() => console.log(`Customer saved:\n${newCustomer}`));
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
  const newProduct = new Product(req.body);
  await newProduct
    .save()
    .then(() => console.log(`Product saved:\n${newProduct}`));
});

// Get product by name
app.post("/getproduct", async (req: any, res: any) => {
  console.log(`REQUEST RECIEVED: ${req.body}`);
  const product = await Product.find({ name: req.body.searchTerm });
  console.log(product);
  res.send(product);
});

// Post new order
app.post("/order", async (req: any, res: any) => {
  const newOrder = new Order(req.body);
  await newOrder.save().then(() => console.log(`Order saved:\n${newOrder}`));
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
