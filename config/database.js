import mongoose from "mongoose";

const connect = async () => {
  const url = process.env.MONGO_DB_URL;

  await mongoose.connect(url);

  console.log(`MongoDB Connected: ${url}`);
};

export default connect;
