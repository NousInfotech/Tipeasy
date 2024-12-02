import mongoose from 'mongoose';


// MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI || '';

const connectDB = async (): Promise<void> => {
    try {
        // Establish connection to MongoDB
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1); // Exit process with failure code
    }
};

export default connectDB;

