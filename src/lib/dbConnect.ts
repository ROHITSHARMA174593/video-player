
// export const connectionString = process.env.MONGODB_URI;





import mongoose from "mongoose";

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "studentDB",
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};
