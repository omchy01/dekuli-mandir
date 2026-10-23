import dns from "node:dns";
import mongoose from "mongoose";
import { DB_NAME } from "./constants";

// Fallback for networks/ISPs that block SRV DNS lookups (querySrv ECONNREFUSED).
// Remove this once your DNS works or you switch to the non-SRV URI.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

type Cache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

const globalWithMongoose = global as typeof globalThis & { _mongoose?: Cache };
const cached: Cache =
  globalWithMongoose._mongoose ||
  (globalWithMongoose._mongoose = { conn: null, promise: null });

export async function connectDB() {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: DB_NAME,
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
  return cached.conn;
}