import mongoose from 'mongoose';
import dotenv from 'dotenv';

export const dbFunction = () => {
    dotenv.config();
    console.log('mphka');
    
    if (!process.env.MONGO_URL) {
        throw new Error('Mongo URL is undefined.');
    }
    
    const connectionString: string = process.env.MONGO_URL;
    
    console.log('Attempting to connect to the database...');
    
    mongoose.connect(connectionString);
    const database = mongoose.connection;
    
    database.on('error', (error) => {
        console.log('Database connection error:', error);
    });
    
    database.once('connected', () => {
        console.log('Database connected successfully');
    });
}
