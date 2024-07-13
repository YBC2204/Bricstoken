import React, { useState } from 'react';
import './Signmob.css';

const SignIn = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('');
  const countries = [
    { value: 'brazil', label: 'Brazil' },
    { value: 'russia', label: 'Russia' },
    { value: 'india', label: 'India' },
    { value: 'china', label: 'China' },
    { value: 'south-africa', label: 'South Africa' }
  ];

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className={`flip-card ${isSignIn }`}>
        <div className={`flip-card-inner ${isSignIn ? '' : 'flipped'}`}>
          <div className="flip-card-front box bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-center">Sign In</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 text-left">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-xs font-medium text-gray-700 text-left">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1 px-3 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign In
              </button>
            </form>
            <div className="text-center mt-4">
              <p className="text-gray-600 text-xs">
                Don't have an account?{' '}
                <button onClick={toggleForm} className="text-indigo-600 hover:underline">
                  Sign Up
                </button>
              </p>
            </div>
          </div>

          <div className="flip-card-back box bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-6 text-center">Sign Up</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-xs font-medium text-gray-700 text-left">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 text-left">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="country" className="block text-xs font-medium text-gray-700 text-left">
                  Select Country
                </label>
                <select
                  id="country"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs bg-white text-black"
                >
                  <option value="" disabled></option>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>{country.label}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-xs font-medium text-gray-700 text-left">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 px-2 py-1 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs"
                />
              </div>
              <button
                type="submit"
                className="w-full py-1 px-3 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </form>
            <div className="text-center mt-4">
              <p className="text-gray-600 text-xs">
                Already have an account?{' '}
                <button onClick={toggleForm} className="text-indigo-600 hover:underline">
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
