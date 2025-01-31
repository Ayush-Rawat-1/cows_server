import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGOURI
// console.log(process.env);
if (!mongoURI) {
    console.error("mongoURI is not defined");
    process.exit(1);
}

const mongoconnect = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Database connected');
    } catch (error) {
        console.error(`Error connecting to the database: ${error}`);
    }
};

export default mongoconnect;
