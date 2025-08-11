import mongoose from 'mongoose';

// function to connect with mongodb database
const connectDB = async() => {

    mongoose.connection.on('connected', () => console.log('Database Connected'));

    await mongoose.connect(`${process.env.MONGODB_URI}/jobify`)

}

export default connectDB;