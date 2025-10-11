import mongoose, { connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}
// Caching the connection to prevent multiple connections in a serverless environment.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If we have a cached connection, use it.
  
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise doesn't exist, create one.
  if (!cached.promise) {

    cached.promise = mongoose.connect(MONGODB_URI as string).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    // Await the connection promise and cache the connection.
    cached.conn = await cached.promise;
    console.log("✅MongoDB connected successfully");
  } catch (e) {
    // If the connection fails, reset the promise and throw the error.
    cached.promise = null;
    console.error(
      "❌MongoDB connection error:",
      e instanceof Error ? e.message : e
    );
    throw e;
  }

  // Return the active connection.
  return cached.conn;
}
export default dbConnect;
