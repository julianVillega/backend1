import { Types } from "mongoose";
import Cart from "../models/cart.model.js";
import MongoCrudManager from "./MongoCrudManager.js";

class CartsManager extends MongoCrudManager {
  constructor() {
    super(Cart);
  }

  async read(id) {
    try {
      const carts = await this.model.aggregate([
        { $match: { user_id: new Types.ObjectId(id) } },

        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "productDetails",
          },
        },

        { $unwind: "$productDetails" },

        {
          $set: {
            subTotal: { $multiply: ["$quantity", "$productDetails.price"] },
          },
        },

        {
          $group: {
            _id: "$user_id",
            total: { $sum: "$subTotal" },
            items: {
              $push: {
                _id: "$productDetails._id",
                category: "$productDetails.category",
                photo: "$productDetails.photo",
                title: "$productDetails.title",
                price: "$productDetails.price",
                quantity: "$quantity",
                subTotal: "$subTotal",
              },
            },
          },
        },

        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "userDetails",
          },
        },

        { $unwind: "$userDetails" },

        {
          $project: {
            _user_id: "$_id",
            total: 1,
            items: 1,
            email: "$userDetails.email",
            _id: 0,
          },
        },
      ]);
      return carts[0];
    } catch (error) {
      throw error;
    }
  }
}

const cartsManager = new CartsManager();
export default cartsManager;
