import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({speciality,docId}) => {
    const { doctors } = useContext(AppContext);
    const [relDoc,setRelDoc] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(doctors.length > 0 && speciality) {
            const doctorsData=doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData);

        }
    }, [doctors,speciality,docId]);

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 bg-white-900 rounded-xl'>    
        <h1 className='text-3xl font-medium'>Top Doctors to book</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto  gap-4 pt-5 px-3 sm-px-0'>
            {
                relDoc.slice(0,5).map((item,index)=>(
                    <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} key={index} className='border border-yellow-200 rounded-xl overflow-hidden cursor-pointer hover:tranlate-y-[-10px] hover:shadow-lg transition-all duration-500 '> 
                        <img className='bg-sky-100' src={item.image} alt="doctor image"></img>
                        <div className='p-4'>
                            <div className='flex items-center gap-2 text-sm text-center text-green-700'>
                            <p className='w-2 h-2 rounded-full bg-green-700'></p><p>Available</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                            </div>
                        </div>
                ))
            }
        </div>
        <button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='bg-slate-900 text-white px-8 py-3 rounded-full mt-3 md-3 my-5'>View All Doctors</button>
    </div>
  )
}

export default RelatedDoctors