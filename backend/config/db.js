import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const resp = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });

        console.log(`MongoDB Connected: ${resp.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
}

export default connectDB;