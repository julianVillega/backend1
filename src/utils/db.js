import { connect } from "mongoose";

const dbConnection = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
