import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const StatCard = ({ icon, count, label }) => (
  <div className="flex items-center gap-2 bg-white p-3 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
    <img className="w-14" src={icon} alt={label} />
    <div>
      <p className="text-xl font-semibold text-gray-700">{count}</p>
      <p className="text-gray-400">{label}</p>
    </div>
  </div>
);

const AppointmentItem = ({ item, slotDateFormat, cancelAppointment }) => {
  const { docData, cancelled, isCompleted, _id, slotDate } = item;
  return (
    <div className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100" key={_id}>
      <img className="rounded-full w-10 h-10 object-cover" src={docData.image} alt={docData.name} />
      <div className="flex-1 text-sm">
        <p className="text-gray-800 font-medium">{docData.name}</p>
        <p className="text-gray-600">{slotDateFormat(slotDate)}</p>
      </div>
      {cancelled ? (
        <p className="text-red-400 text-xs font-medium">Cancelled</p>
      ) : isCompleted ? (
        <p className="text-green-400 text-xs font-medium">Completed</p>
      ) : (
        <img
          onClick={() => cancelAppointment(_id)}
          className="w-10 cursor-pointer"
          src={assets.cancel_icon}
          alt="Cancel Appointment"
          title="Cancel Appointment"
        />
      )}
    </div>
  );
};

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  if (!dashData) return null;

  const { doctors, appointments, patients, latestAppointments } = dashData;

  return (
    <div className='w-full max-w-4xl p-4 px-6'>
      {/* Stat cards */}
      <div className="flex flex-wrap gap-2">
        <StatCard icon={assets.doctor_icon} count={doctors} label="Doctors" />
        <StatCard icon={assets.appointments_icon} count={appointments} label="Appointments" />
        <StatCard icon={assets.patients_icon} count={patients} label="Patients" />
      </div>

      {/* Latest bookings */}
      <div className="bg-white mt-10 border rounded">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b">
          <img src={assets.list_icon} alt="Latest Bookings" />
          <p className="font-semibold">Latest Bookings</p>
        </div>
        <div className="max-h-80 overflow-y-scroll">
          {latestAppointments.length === 0 ? (
            <p className="px-6 py-4 text-gray-500 text-sm">No recent appointments found.</p>
          ) : (
            latestAppointments.map((item) => (
              <AppointmentItem
                key={item._id}
                item={item}
                slotDateFormat={slotDateFormat}
                cancelAppointment={cancelAppointment}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
