/* global process */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

export const connectDB = async () => {
    console.log('⏳ Connecting to MongoDB...');

    try {
        // Try connecting to the configured URI first
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log('✅ Connected to MongoDB (Standard Mode)');
        process.env.DB_MODE = 'standard';
        return true;
    } catch (standardErr) {
        console.error('❌ Standard MongoDB Connection Error:', standardErr);
        console.warn('⚠️ Switching to In-Memory mode...');

        try {
            mongoServer = await MongoMemoryServer.create();
            const mongoUri = mongoServer.getUri();
            await mongoose.connect(mongoUri);
            console.log('✅ Connected to MongoDB (In-Memory Mode)');
            console.log('ℹ️  Note: Data will not persist between server restarts.');
            process.env.DB_MODE = 'memory';
            return true;
        } catch (innerErr) {
            console.error('❌ Critical: Failed to start In-Memory MongoDB:', innerErr.message);
            return false;
        }
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        if (mongoServer) {
            await mongoServer.stop();
        }
        console.log('✅ Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from database:', error);
    }
};
