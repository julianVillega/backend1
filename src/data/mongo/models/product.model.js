import { model, Schema } from "mongoose";

const collection = "products";

const schema = new Schema({
  category: { type: String },
  photo: { type: String },
  title: { type: String, required: true },
  price: { type: Number },
  stock: { type: Number },
});

const Product = model(collection, schema);
export default Product;
