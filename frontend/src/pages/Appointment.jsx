import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const navigate = useNavigate()
  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    const today = new Date()

    for (let i = 1; i <= 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i) // Start from tomorrow

      const startTime = new Date(currentDate)
      startTime.setHours(10, 0, 0, 0) // 10 AM

      const endTime = new Date(currentDate)
      endTime.setHours(16, 0, 0, 0) // 4 PM

      const timeSlots = []
      while (startTime < endTime) {
        const formattedTime = startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

   const date = new Date(startTime)


     let day = date.getDate().toString().padStart(2, '0')
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let year = date.getFullYear()

    const slotDate = `${day}_${month}_${year}`
    const slotTime=formattedTime

    const isSlotAvailable=docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false :true

    if (isSlotAvailable) {
       timeSlots.push({
          dateTime: new Date(startTime),
          time: formattedTime,
        })
    }


       
        startTime.setMinutes(startTime.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  const bookAppointment = async () => {
  if (!token) {
    toast.warn("Log in to book appointments")
    return navigate("/login")
  }

  try {
    if (!docSlots[slotIndex] || docSlots[slotIndex].length === 0) {
      toast.error("No slots available for the selected date")
      return
    }

    if (!slotTime) {
      toast.warn("Please select a time slot")
      return
    }

    const date = docSlots[slotIndex][0].dateTime

    let day = date.getDate().toString().padStart(2, '0')
    let month = (date.getMonth() + 1).toString().padStart(2, '0')
    let year = date.getFullYear()

    const slotDate = `${day}_${month}_${year}`

    const { data } = await axios.post(
      backendUrl + "/api/user/book-appointment",
      { docId, slotDate, slotTime },
      { headers: { token } }
    )

    if (data.success) {
      toast.success(data.message)
      getDoctorsData()
      navigate("/my-appointments")
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.error(error)
    toast.error(error.response?.data?.message || "Booking failed")
  }
}


  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

 useEffect(() => {
  if (docInfo) {
    getAvailableSlots()
  }
}, [docInfo])


  return (
    docInfo && (
      <div className="px-4 py-6 max-w-7xl mx-auto bg-gradient-to-b from-white to-gray-50 min-h-screen">
        {/* Doctor Info */}
        <div className="flex flex-col sm:flex-row gap-6 items-start bg-white shadow-xl rounded-3xl p-6 sm:p-10 relative">
          <img
            className="rounded-2xl w-full sm:w-72 object-cover shadow-lg"
            src={docInfo.image}
            alt="Doctor"
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <span className="px-2 py-0.5 text-xs border border-gray-300 rounded-full">
                {docInfo.experience}
              </span>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-semibold text-gray-800">
                About <img src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-600 mt-1">{docInfo.about}</p>
            </div>
            <p className="text-sm text-gray-700 font-medium">
              Appointment Fee:{' '}
              <span className="text-gray-900 font-semibold">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Section */}
        <div className="mt-10 bg-white rounded-3xl shadow-lg p-6 sm:p-10">
          <p className="text-lg font-semibold text-gray-800 mb-4">Booking Slots</p>

          {/* Date Slots */}
          <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setSlotIndex(index)}
                  key={index}
                  className={`text-center px-4 py-3 rounded-2xl cursor-pointer shadow-md min-w-20 transition-all duration-200 ${slotIndex === index
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <p className="font-medium">{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                  <p className="text-sm">{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))}
          </div>

          {/* Time Slots */}
          <div className="flex flex-wrap gap-3 mt-6">
            {docSlots.length > 0 &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-medium px-5 py-2 rounded-full cursor-pointer border transition-all duration-200 ${item.time === slotTime
                      ? 'bg-cyan-600 text-white shadow-md'
                      : 'text-gray-500 bg-gray-50 hover:bg-gray-100 border-gray-300'
                    }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Book Button */}
          <div className="mt-8 text-center">
            <button onClick={bookAppointment} className="bg-black text-white px-10 py-3 rounded-full text-sm font-medium shadow-lg hover:bg-gray-800 transition-all">
              Book an Appointment
            </button>
          </div>
        </div>
        {/* Listing Related Doctors  */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  )
}

export default Appointment
