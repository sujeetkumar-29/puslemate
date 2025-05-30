import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export default function Banner() {
    const navigate= useNavigate();
  return (
    <section className="bg-cyan-50 px-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 ">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Book an Appointment with Trusted Doctors
          </h1>
          <p className="text-gray-600 mb-6">
            Find experienced specialists near you and schedule appointments with ease.
          </p>
          <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="bg-slate-900 text-white px-6 py-3 rounded-md hover:text-sm transition-all duration-500">
            Get Started
          </button>
        </div>

        {/* Right Content */}
        <div className="flex-1">
          <img
            src={assets.appointment_img}
            alt="Doctor illustration"
            className="w-full max-w-md mx-auto lg:mx-0"
          />
        </div>
      </div>
    </section>
  );
}
