import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";



export default function SpecialityMenu() {
    return (
        <section className="py-10 px-4 max-w-6xl mx-auto" id="speciality">
            <h2 className="text-3xl font-bold text-center mb-4">Find by Speciality</h2>
            <p className="text-center text-gray-600 mb-10">
                Find the best doctors in town with just a few clicks! Our platform offers a curated list of trusted medical professionals, making it easy to book appointments and take control of your health.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {specialityData.map((specialty, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center border rounded-xl p-6 transition-transform duration-200 hover:scale-105 hover:shadow-md"
                    >
                        <Link onClick={()=>scrollTo(0,0)} key={index} to={`/doctors/${specialty.speciality}` }className="flex flex-col items-center"  >
                        <img
                            src={specialty.image}
                            alt={specialty.name}
                            className="w-24 h-24 mb-4 object-cover rounded-full shadow-lg"
                        />
                        <h3 className="font-semibold text-lg text-center">{specialty.speciality}</h3>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}
