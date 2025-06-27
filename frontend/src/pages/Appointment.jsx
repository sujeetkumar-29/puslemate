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
  const [showMap, setShowMap] = useState(false)

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    const today = new Date()

    for (let i = 1; i <= 90; i++) {
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
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

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

  // Function to get Google Maps embed URL
  const getGoogleMapsEmbedUrl = (address) => {
    const encodedAddress = encodeURIComponent(`${address.line1}, ${address.line2}`)
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodedAddress}`
  }

  // Function to open Google Maps in new tab
  const openInGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(`${address.line1}, ${address.line2}`)
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank')
  }

  // Function to get directions
  const getDirections = (address) => {
    const encodedAddress = encodeURIComponent(`${address.line1}, ${address.line2}`)
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank')
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
            
            {/* Enhanced Address Section with Map Options */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Clinic Address
                  </p>
                  <p className="text-sm text-gray-600">{docInfo.address.line1}</p>
                  <p className="text-sm text-gray-600">{docInfo.address.line2}</p>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => setShowMap(!showMap)}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    {showMap ? 'Hide Map' : 'Show Map'}
                  </button>
                  <button
                    onClick={() => openInGoogleMaps(docInfo.address)}
                    className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
                  >
                    Open in Maps
                  </button>
                  <button
                    onClick={() => getDirections(docInfo.address)}
                    className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    Get Directions
                  </button>
                </div>
              </div>
              
              {/* Embedded Map */}
              {showMap && (
                <div className="mt-4">
                  <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-inner">
                    {/* Option 1: Google Maps Embed (requires API key) */}
                    {/* <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={getGoogleMapsEmbedUrl(docInfo.address)}
                      allowFullScreen
                    ></iframe> */}
                    
                    {/* Option 2: OpenStreetMap (free alternative) */}
                    {/* <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(docInfo.address.line1 + ', ' + docInfo.address.line2)}&layer=mapnik`}
                    ></iframe> */}
                    
                    {/* Option 3: Placeholder with address info */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                      <div className="text-center">
                        <svg className="w-12 h-12 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm text-blue-700 font-medium">Map View</p>
                        <p className="text-xs text-blue-600 mt-1">
                          {docInfo.address.line1}<br />
                          {docInfo.address.line2}
                        </p>
                        <p className="text-xs text-blue-500 mt-2">
                          Click "Open in Maps" for full map experience
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                  <p className="text-sm pt-1">
                    {item[0] &&
                      `${item[0].dateTime.getDate()} ${item[0].dateTime.toLocaleString('default', { month: 'short' })}`}
                  </p>
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
        
        {/* Listing Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  )
}

export default Appointment