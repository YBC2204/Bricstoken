import React from 'react'
import Sign from '../components/Sign'
import SignIn from '../components/Signmob'
import 'tailwindcss/tailwind.css'

const Login = () => {
  // http://localhost:3000/api/users/register
  
  return (
    <div>
      {/* Hidden on small screens, visible on medium and larger screens */}
      
      <Sign></Sign>
    </div>
  )
}

export default Login

