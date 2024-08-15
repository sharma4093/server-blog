import mongoose from 'mongoose';

export const connectDB = async () => {

   try {
      await mongoose.connect(String(process.env.MONGO_URL));
      console.log('MongoDB connected successfully');
   }
   catch (error) {
      console.log('MONGODB connection error ', error.message);
      process.exit(1);
   }
};