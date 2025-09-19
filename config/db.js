import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js'; // Import User model

dotenv.config();

// --- FIX START ---
// In a real-world application, this should be in a .env file.
// We are adding it here directly to resolve the connection error for now.
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://amd254371_db_user:cbgD8umbnk5gNdfV@cluster0.rkgucvc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// --- FIX END ---

const connectDB = async () => {
  try {
    // FIX: Use the MONGO_URI variable defined above.
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Seed admin user if it doesn't exist
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      await User.create({
        username: 'admin',
        password: 'password123', // This will be automatically hashed by the pre-save hook in the User model
      });
      console.log(
        'Default admin user created. Username: "admin", Password: "password123"'
      );
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB or seeding admin: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
