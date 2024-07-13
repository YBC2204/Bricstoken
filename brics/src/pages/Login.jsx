import React from 'react'
import Sign from '../components/Sign'
import SignIn from '../components/Signmob'
import 'tailwindcss/tailwind.css'

const Login = () => {
  return (
    <div>
      {/* Hidden on small screens, visible on medium and larger screens */}
      <div className="hidden md:block">
        <Sign />
      </div>
      {/* Visible on small screens, hidden on medium and larger screens */}
      <div className="block md:hidden">
        <SignIn />
      </div>
    </div>
  )
}

export default Login

