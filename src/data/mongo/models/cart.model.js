import { Schema, model, Types } from "mongoose";

const collection = "carts";

const schema = new Schema({
  product_id: { type: Types.ObjectId, ref: "products", required: true },
  user_id: { type: Types.ObjectId, ref: "users", required: true },
  quantity: { type: Number, default: 1, min: 1 },
  state: {
    type: String,
    default: "reserved",
    enum: ["reserved", "paid", "delivered"],
  },
});

schema.pre("find", function(){this.populate("user_id","-_id -password -__v")});
schema.pre("find", function(){this.populate("product_id","-_id -__v")});

const Cart = model(collection, schema);
export default Cart;
