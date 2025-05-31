import React, { use, useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Doctors = () => {
  const {speciality}=useParams();
  // console.log(speciality);
  const [filterDoc,setFilterDoc]=useState([]);
  const [showFilter,setShowFilter]=useState(false);
  const navigate=useNavigate();
  // const [showFilter,setShowFilter]=useState(false);
  const {doctors}=useContext(AppContext);
  const applyFilter=()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
    }else{
      setFilterDoc(doctors);
    }
  }
  useEffect(()=>{
    applyFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[doctors,speciality]);
  return (
    <div>
      <p>Browse through the doctors specialist.</p> <br /> 
      <div className='w-full'>
        <button className={`py=1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter? "bg-slate-900 text-white":""}`} onClick={()=>setShowFilter(prev => !prev)}>Filter</button>
        <div className={` flex-col lg:text-center sm:flex-row sm:flex-wrap gap-3 items-start sm:items-center text-center ${showFilter ? "flex":"hidden sm:flex"} `}>
          <p onClick={()=>speciality === "General physician" ? navigate("/doctors"): navigate("/doctors/General physician")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gary-300 rounded-full tansition-all cursor-pointer  ${speciality === "General physician" ? "bg-indigo-100 text-black " : "" }`}>General physician</p>
          <p onClick={()=>speciality === "Gynecologist" ? navigate("/doctors"): navigate("/doctors/Gynecologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gary-300 rounded-full tansition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black " : "" }`}>Gynecologist</p>
          <p onClick={()=>speciality === "Dermatologist" ? navigate("/doctors"): navigate("/doctors/Dermatologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gary-300 rounded-full tansition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black " : "" }`}>Dermatologist</p>
          <p onClick={()=>speciality === "Pediatricians" ? navigate("/doctors"): navigate("/doctors/Pediatricians")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gary-300 rounded-full tansition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black " : "" }`}>Pediatricians</p>
          <p onClick={()=>speciality === "Neurologist" ? navigate("/doctors"): navigate("/doctors/Neurologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gary-300 rounded-full tansition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black " : "" }`}>Neurologist</p>
          <p onClick={()=>speciality === "Gastroenterologist" ? navigate("/doctors"): navigate("/doctors/Gastroenterologist")} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gary-300 rounded-full tansition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black " : "" }`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 px-3 sm:px-0'>
          {
            filterDoc.map((item,index)=>(
                    <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className='border border-yellow-200 rounded-xl overflow-hidden cursor-pointer hover:tranlate-y-[-10px] hover:shadow-lg transition-all duration-500 '> 
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
      </div>
    </div>
  )
}

export default Doctors