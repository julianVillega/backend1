import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "products";

const schema = new Schema({
  category: { type: String },
  photo: { type: String },
  title: { type: String, required: true },
  price: { type: Number },
  stock: { type: Number },
});

schema.plugin(mongoosePaginate);

const Product = model(collection, schema);
export default Product;
