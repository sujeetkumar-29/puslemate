import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloundinary.js';
import adminRouter from './routes/adminRoute.js';
import DoctorRouter from './routes/doctorRoute.js';


// app configuration
const app = express();
const PORT = process.env.PORT || 4000;
// connect to database
connectDB()
// connect to cloudinary
 await connectCloudinary();

// middleware
app.use(express.json());
app.use(cors())

// api endpoints
// localhost:4000/api/admin/add-doctor
app.use("/api/admin", adminRouter);

app.use("/api/doctor",DoctorRouter)

app.get("/",(req,res)=>{
    res.send("Api working successfully");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});