import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-6 my-16 px-4 md:px-10 text-gray-900 bg-gradient-to-b from-gray-50 to-gray-200 rounded-xl py-10 shadow-md">
      <h1 className="text-3xl font-semibold">Top Doctors to Book</h1>
      <p className="text-center text-sm max-w-xl text-gray-700">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {doctors.slice(0, 8).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="border border-yellow-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 bg-white"
          >
            <img
              className="w-full h-70 object-cover bg-gray-400"
              src={item.image}
              alt="doctor"
            />
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? 'bg-green-700' : 'bg-gray-500'
                  }`}
                ></span>
                <p
                  className={`${
                    item.available ? 'text-green-700' : 'text-gray-500'
                  }`}
                >
                  {item.available ? 'Available' : 'Not Available'}
                </p>
              </div>
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors');
          scrollTo(0, 0);
        }}
        className="bg-slate-900 text-white px-6 py-3 rounded-full mt-8 hover:bg-slate-800 transition"
      >
        View All Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
