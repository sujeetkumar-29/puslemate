import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h2>

      <div className="space-y-6">
        {doctors.slice(0, 5).map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Doctor Image */}
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-full border" />

            {/* Doctor Info */}
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.speciality}</p>
              <p className="text-sm text-gray-500">Experience: {item.experience}</p>
              <p className="text-sm text-gray-500">
                Address: {item.address.line1}, {item.address.line2}
              </p>
              <p className="text-sm font-medium text-blue-600">Date & Time: 04 June 2025 | 3:30 PM</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:ml-auto">
             <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-green-600 hover:text-white transition">
  Pay Online
</button>

<button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-red-500 hover:text-white transition">
  Cancel Appointment
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
