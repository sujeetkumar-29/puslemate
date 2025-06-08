import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ];

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4 text-center">Browse Doctors by Speciality</h2>

      {/* Toggle Button for Small Screens */}
      <div className="sm:hidden text-center mb-4">
        <button
          className={`px-4 py-2 border rounded-full text-sm transition-all ${
            showFilter ? 'bg-slate-900 text-white' : ''
          }`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Speciality Filters */}
      <div className={`flex flex-wrap gap-3 justify-center ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
        {specialities.map((spec, index) => (
          <p
            key={index}
            onClick={() =>
              speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)
            }
            className={`px-4 py-2 border border-gray-300 rounded-full cursor-pointer text-sm transition-all duration-200 ${
              speciality === spec ? 'bg-indigo-100 text-black font-medium' : ''
            }`}
          >
            {spec}
          </p>
        ))}
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-yellow-200 rounded-xl overflow-hidden cursor-pointer bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <img
              className="w-full  object-cover bg-gray-400"
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
              <p className="text-lg font-semibold text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
