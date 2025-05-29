import React from "react";
import { specialityData } from "../assets/assets";

const specialties = [
    {
        name: "General Physician",
        image: "https://via.placeholder.com/100?text=Physician",
    },
    {
        name: "Gynecologist",
        image: "https://via.placeholder.com/100?text=Gynecologist",
    },
    {
        name: "Pediatricians",
        image: "https://via.placeholder.com/100?text=Pediatrician",
    },
    {
        name: "Neurologist",
        image: "https://via.placeholder.com/100?text=Neurologist",
    },
    {
        name: "Gastroenterologist",
        image: "https://via.placeholder.com/100?text=Gastro",
    },
];

export default function SpecialityMenu() {
    return (
        <section className="py-10 px-4 max-w-6xl mx-auto">
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
                        <img
                            src={specialty.image}
                            alt={specialty.name}
                            className="w-24 h-24 mb-4"
                        />
                        <h3 className="font-semibold text-lg text-center">{specialty.speciality}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
