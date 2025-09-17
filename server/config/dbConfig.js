import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_DB);

    console.log(`mongoDB is connect ${connected.connection.host}`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default dbConnect;
