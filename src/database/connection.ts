import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI || '';

let isConnected = false;

const connectDb = async (): Promise<void> => {

    if (isConnected) {
        return; // Skip if already connected
    }

    try {
        await mongoose.connect(MONGO_URI);
        isConnected = true
        console.log('MongoDb is Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
};

export default connectDb;

