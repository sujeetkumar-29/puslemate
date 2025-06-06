import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';


// Api for adding a doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file // Assuming you are using multer for file uploads

        // console.log({name, email, password, speciality, degree, experience, about, available, fees, address}, imageFile);

        // checking for add data to add doctor 
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }

        // validating email format
        if (validator.isEmail(email) === false) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        // validating password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }
        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let imageUrl;
        // uploading image to cloudinary
        try {
          const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
         
            resource_type: "image"
        });
         imageUrl = imageUpload.secure_url;  
        } catch (error) {
                 console.error('Error uploading to Cloudinary:', error);
    return  res.status(500).json({ message: 'Upload failed' });
        }
        



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
      return   res.json({ success: true, message: "Doctor added successfully"});

    
    } catch (error) {
        console.error("Error adding doctor:", error);
      return  res.json({ success: false, message: error.message });

    }
}

// API FOR ADMN LOGIN
const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        // console.log(email, password);
    //       console.log("Incoming login request:");
    // console.log("Email from request:", email);
    // console.log("Password from request:", password);
    // console.log("Expected email:", process.env.ADMIN_EMAIL);
    // console.log("Expected password:", process.env.ADMIN_PASSWORD);

        // Check if email and password are provided
        if (email === process.env.ADMIN_EMAIL  && password === process.env.ADMIN_PASSWORD) {
           const token = jwt.sign( email+password,process.env.JWT_SECRET);
           res.json({ success: true, message: "Login successful", token });
        }
        else{
            res.json({ success: false, message: "Please provide valid email and password" });
        }
    }catch(error) {
        console.error("Error logging in admin:", error);
        res.json({ success: false, message: error.message || "Internal server error" });
    }
}
// API TO get all Doctors list for admin panel
const allDoctors= async (req,res)=>{
    try {
            const doctors= await doctorModel.find({}).select("-password")
            res.json({success:true,doctors})
    } catch (error) {
            console.log(error)
            res.json({success:false,message:error.message})
    }
}

// API to get all appointment list
const appointmentsAdmin = async (req,res)=>{
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
         console.log(error)
            res.json({success:false,message:error.message})
    }
}

export { addDoctor , loginAdmin , allDoctors , appointmentsAdmin} ;