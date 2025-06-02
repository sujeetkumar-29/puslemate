import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on("connected", () =>
        console.log("Database connected")
    );

    const uri = process.env.MONGO_URI.replace(/\/+$/, ''); // remove trailing slash
    await mongoose.connect(`${uri}/pulsemate`);
};

export default connectDB;
