import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 Year");
    const [fees, setFees] = useState("");
    const [speciality, setSpeciality] = useState("General physician");
    const [degree, setDegree] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [about, setAbout] = useState("");

    const {backendUrl , aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
        if (!docImg) {
          return toast.error("Please upload a doctor image"); 
          
        }
        const formData = new FormData();
        formData.append("image", docImg);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("experience", experience);
        formData.append("fees", Number(fees));
        formData.append("speciality", speciality);
        formData.append("degree", degree);
        formData.append("address", JSON.stringify({line1:address1,line2:address2}));
        // formData.append("address2",{});
        formData.append("about", about);

        // console.log(formData);
        formData.forEach((value, key) => {
          // console.log(`${key}: ${value}`);
        }
        );

        const {data}=await axios.post(backendUrl + "/api/admin/add-doctor", formData, {headers:{aToken } })
        if(data.success){
          toast.success(data.message);
          setDocImg(false)
          setName("")
          setEmail("")
          setPassword("")
          setAddress1("")
          setAddress2("")
          setDegree("")
          setAbout("")
          setFees("")
           

        }else{
          toast.error(data.message);
          // console.log(error)
        }
        
    } catch (error) {
        toast.error(error.message)
        console.log(error);
    }
      
    }
  return (
    <div className="w-full max-w-4xl  p-4 px-10">
      <h2 className="text-xl font-semibold text-black-600 mb-4">Add Doctor</h2>

      {/* Scrollable Form */}
      <div className="bg-white shadow-2xl rounded-xl p-6 max-h-[80vh] overflow-y-auto space-y-6">
        <form onSubmit={onSubmitHandler} className="space-y-6">

          {/* Upload Picture */}
          <div className="flex flex-col items-center">
            <label htmlFor="doc-img" className="cursor-pointer">
              <img 
                src={docImg ?  URL.createObjectURL(docImg) : assets.upload_area}
                alt="Upload"
                className="w-36 h-36 rounded-full border-4 border-dashed border-cyan-300 object-cover hover:scale-105 transition"
              />
            </label>
            <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <p className="text-gray-600 mt-2">Upload Doctor Picture</p>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-1">Doctor Name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name}
                  type="text"
                  placeholder="Name"
                  required
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <p className="font-medium mb-1">Doctor Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email}
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <p className="font-medium mb-1">Doctor Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password}
                  type="password"
                  placeholder="Password"
                  required
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <p className="font-medium mb-1">Experience</p>
                <select onChange={(e)=>setExperience(e.target.value)} value={experience}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {/* <option value="">Select Experience</option> */}
                  <option value="1 Year">1 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="3 Years">3 Years</option>
                  <option value="4 Years">4 Years</option>
                  <option value="5 Years">5 Years</option>
                  <option value="6 Years">6 Years</option>
                  <option value="7 Years">7 Years</option>
                  <option value="8 Years">8 Years</option>
                  <option value="9 Years">9 Years</option>
                  <option value="10 Years">10 Years</option>
                </select>
              </div>
              <div>
                <p className="font-medium mb-1">Fees</p>
                <input onChange={(e)=>setFees(e.target.value)} value={fees}
                  type="number"
                  placeholder="Fees"
                  required
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-1">Speciality</p>
                <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality}
                  required
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Speciality</option>
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div>
                <p className="font-medium mb-1">Education</p>
                <input onChange={(e)=>setDegree(e.target.value)} value={degree}
                  type="text"
                  placeholder="Education"
                  required
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <p className="font-medium mb-1">Address</p>
                <input onChange={(e)=>setAddress1(e.target.value)} value={address1}
                  type="text"
                  placeholder="Address 1"
                  required
                  className="w-full mb-2 border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input onChange={(e)=>setAddress2(e.target.value)} value={address2}
                  type="text"
                  placeholder="Address 2"
                  required
                  className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <p className="font-medium mb-1">About Doctor</p>
            <textarea onChange={(e)=>setAbout(e.target.value)} value={about}
              placeholder="Write about doctor"
              required
              className="w-full border border-gray-300 p-3 rounded-md h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-cyan-700 transition shadow-lg"
            >
              Add Doctor
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
