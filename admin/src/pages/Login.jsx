import React, { useState } from 'react'
import {assets} from "../assets/assets"

const Login = () => {
    const [state,setState]=useState("Admin");
  return (
    <form>
         <p><span>{state}</span>Login</p>
    </form>
  )
}

export default Login