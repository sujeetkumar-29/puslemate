import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  // const { doctors } = useContext(AppContext);
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([])
  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const navigate = useNavigate()
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_")
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const getUserAppointments = async (req, res) => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      // console.log(appointmentId)

      const { data } = await axios.post(backendUrl + "/api/user/cancel-appointment", { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } })
          if (data.success) {
            // toast.success(data.message)
            getUserAppointments()
            navigate("/my-appointments")
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/payment-razorpay", { appointmentId }, { headers: { token } })

      if (data.success) {
        // console.log(data.order)
        initPay(data.order)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token]
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Appointments</h2>

      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Doctor Image */}
            <img src={item.docData.image} alt='doc image' className="w-24 h-24 object-cover rounded-full border" />

            {/* Doctor Info */}
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{item.docData.name}</h3>
              <p className="text-sm text-gray-500">{item.docData.speciality}</p>
              <p className="text-sm text-gray-500">Experience: {item.docData.experience}</p>
              <p className="text-sm text-gray-500">
                Address: {item.docData.address.line1}, {item.docData.address.line2}
              </p>
              <p className="text-sm font-medium text-blue-600">Date & Time: {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:ml-auto">
              {!item.cancelled && item.payment && <button className='sm:min-w-48 py-2 border rounded text-stone-500 bg-green-100 '>Paid</button>}
              {
                !item.cancelled && !item.payment &&
                <button onClick={() => appointmentRazorpay(item._id)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-green-600 hover:text-white transition">
                  Pay Online
                </button>
              }
              {
                !item.cancelled &&

                <button onClick={() => cancelAppointment(item._id)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-red-500 hover:text-white transition">
                  Cancel Appointment
                </button>
              }
              {
                item.cancelled && <button className='sm:min-w-48 py-2 border border-red-400 rounded text-red-400'>Appointment Cancelled</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
