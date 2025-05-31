import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';

// Api for adding a doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file // Assuming you are using multer for file uploads

        // console.log({name, email, password, speciality, degree, experience, about, available, fees, address}, imageFile);

        // checking for add data to add doctor 
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        // validating email format
        if (validator.isEmail(email) === false) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        // validating password length
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
        }
        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // uploading image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            // folder: "doctors",
            resource_type: "image"
        });
        const imageUrl = imageUpload.secure_url;



        // Create a new doctor object
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        };

        // // Save the doctor to the database
        const newDoctor = new  doctorModel(doctorData);
        await newDoctor.save();

        // Return success response
        res.status(201).json({ success: true, message: "Doctor added successfully"});

    
    } catch (erorr) {
        console.error("Error adding doctor:", erorr);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });

    }
}

// API FOR ADMN LOGIN
const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;

        // Check if email and password are provided
        if (email === process.env.ADMIN_EMAIL  && password === process.env.ADMIN_PASSWORD) {
           const token = jwt.sign( email+password,process.env.JWT_SECRET);
           res.status(200).json({ success: true, message: "Login successful", token });
        }
        else{
            res.status(400).json({ success: false, message: "Please provide valid email and password" });
        }
    }catch(error) {
        console.error("Error logging in admin:", error);
        res.status(500).json({ success: false, message: error.message || "Internal server error" });
    }
}

export { addDoctor ,loginAdmin};