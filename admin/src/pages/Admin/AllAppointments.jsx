import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments } = useContext(AdminContext)
  const { calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-xl font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p className="text-gray-600">#</p>
          <p className="text-gray-600">Patient</p>
          <p className="text-gray-600">Age</p>
          <p className="text-gray-600">Date & Time</p>
          <p className="text-gray-600">Doctor</p>
          <p className="text-gray-600">Fees</p>
          <p className="text-gray-600">Actions</p>
        </div>
        {
          appointments.map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
              <p className='max-sm:hidden'> {index + 1} </p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full ' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
            </div>

            </div>
          ))}
      </div>
    </div>


  )
}

export default AllAppointments