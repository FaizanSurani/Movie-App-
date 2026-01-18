import  mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connection Established");
    } catch (error) {
        console.log("Failed to connect to the database server", error);
    }
}

export default connectDB;