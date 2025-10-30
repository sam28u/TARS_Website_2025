import mongoose from 'mongoose';

export async function connectToDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error("MONGODB_URI not provided");
  }
  await mongoose.connect(mongoUri);
  console.log("Connected to MongoDB");
}