import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const applyFilter = () => {
    let filtered = doctors;

    // Filter by speciality if selected
    if (speciality) {
      filtered = filtered.filter(doc => doc.speciality === speciality);
    }

    // Filter by search term if provided
    if (searchTerm.trim()) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
      );
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchTerm]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ];

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="px-4 py-8">

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search doctors by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {searchTerm && (
            <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>
          <h2 className="text-2xl font-medium mb-6 text-center text-md ">Browse Doctors by Speciality</h2>

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
      <div className={`flex flex-wrap gap-3 justify-center mb-6 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
        {specialities.map((spec, index) => (
          <p
            key={index}
            onClick={() =>
              speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)
            }
            className={`px-4 py-2 border border-gray-300 rounded-full cursor-pointer text-sm transition-all duration-200 hover:bg-gray-50 ${
              speciality === spec ? 'bg-indigo-100 text-black font-medium' : ''
            }`}
          >
            {spec}
          </p>
        ))}
      </div>

      {/* Results Count */}
      <div className="text-center mb-4">
        <p className="text-gray-600">
          {searchTerm ? `Found ${filterDoc.length} doctor(s) matching "${searchTerm}"` : 
           speciality ? `Showing ${filterDoc.length} ${speciality}(s)` :
           `Showing all ${filterDoc.length} doctors`}
        </p>
      </div>

      {/* No Results Message */}
      {filterDoc.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No doctors found</p>
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filterDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-yellow-200 rounded-xl overflow-hidden cursor-pointer bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <img
              className="w-full h-54 object-cover bg-gray-400"
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