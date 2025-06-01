import React, { useContext } from 'react'
import Login from './pages/Login'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import { AppContext } from './context/AppContext'

const App = () => {
  const {aToken}=useContext(AdminContext);
  return aToken ? (
    <div className=''>
      
      <ToastContainer />
    </div>
  ) :(
    <>
       <Login />
      <ToastContainer />
    </>
  )
}

export default App