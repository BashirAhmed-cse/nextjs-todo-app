import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect(process.env.Mongo_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit(1);
        });

    } catch (error) {
        console.log('Something went wrong!');
        console.error(error);
        process.exit(1);
    }
}

export function disconnect() {
    return mongoose.disconnect();
}

// Other utility functions related to your database operations can also be added here
