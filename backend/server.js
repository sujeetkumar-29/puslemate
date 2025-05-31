import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloundinary.js';


// app configuration
const app = express();
const PORT = process.env.PORT || 4000;
// connect to database
connectDB()
// connect to cloudinary
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors())

// api endpoints

app.get("/",(req,res)=>{
    res.send("Api working successfully");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});