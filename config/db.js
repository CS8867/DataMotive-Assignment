import mongoose from 'mongoose';
import 'dotenv/config';

const url = process.env.MONGO_URL;
// console.log(process.env);
// console.log(url);

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error.message);

    }
}

export default connectDB;