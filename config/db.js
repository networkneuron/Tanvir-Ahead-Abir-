import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js'; // Import User model

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
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
