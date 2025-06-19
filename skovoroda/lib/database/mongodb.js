// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.SK_MONGODB_URI;
if (!uri || typeof uri !== 'string') {
  throw new Error('MongoDB connection string is not defined or invalid!');
}
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri); 
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
