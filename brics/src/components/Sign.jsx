import  { useEffect, useState } from 'react';
import './Sign.css';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Sign = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [login, setLogin] = useState(false);
  const [name, setName] = useState('');
  const [registered, setRegistered] = useState(false);

  const navigate = useNavigate();


  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };



  const countries = [
    { value: 'brazil', label: 'Brazil' },
    { value: 'russia', label: 'Russia' },
    { value: 'india', label: 'India' },
    { value: 'china', label: 'China' },
    { value: 'south-africa', label: 'South Africa' },
    { value: 'uae', label: 'UAE' },
    { value: 'iran', label: 'Iran' },
    { value: 'egypt', label: 'Egypt' },
    { value: 'ethiopia', label: 'Ethiopia' }
  ];

  const registerfn = async (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('name', name);
    // formData.append('email', email);
    // formData.append('Country', selectedCountry);
    // formData.append('password', password);

  //   let formData = {
  //     "email":email,
  //     "country":selectedCountry,
  //     "password":password
  // }

    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        "email":email,
        "country":selectedCountry,
        "password":password
    });
      
      console.log(response.data);
      console.log(token);
      localStorage.setItem('token', token);
    
      setRegistered(true);
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again later.');
    }
  };

  // if (registered) {
  //   navigate('/login');
  // }

  const loginfn = async (e) => {
    e.preventDefault();
    try {
      // const FormData = new FormData();
      // formData.append('email', email);
      // formData.append('password', password);
      
      // const storedToken = localStorage.getItem('token');
      
      const response = await axios.post('http://localhost:3000/api/users/login', {
        "email":email,
      "password":password
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      console.log(token);
      
      setLogin(true);
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again later.');
    }
  };

  if (login) {
    navigate("/home");
  }

  return (
    <div className="h-screen   bg-gradient-to-r from-slate-800 via-slate-900 to-black flex justify-center items-center">

      <div className={`border border-white w-3/4 container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">

          <form className="bg-white p-6 rounded-lg" onSubmit={registerfn}>
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              type="text"
              placeholder="Name"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              type="email"
              placeholder="Email"
              required
            />

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="input-field"
              required
            >
              <option value="" disabled>Select a BRICS Country</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>{country.label}</option>
              ))}
            </select>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              type="password"
              placeholder="Password"
              required
            />
            <button className="btn-primary" type="submit">Sign Up</button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="bg-white p-6 rounded-lg" onSubmit={loginfn}>
            <h1 className="text-3xl font-bold mb-4 text-black text-center p-4">Sign in</h1>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              type="password"
              placeholder="Password"
              required
            />
            <a className="text-blue-500 mb-4 block" href="/">Forgot your password?</a>
            <button className="btn-primary" type="submit">Sign In</button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="text-white text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-white mb-4">To keep connected with us please login with your personal info</p>
              <button className="btn-secondary" onClick={handleToggle}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-white text-3xl font-bold mb-4">Hello, Friend!</h1>
              <p className="text-white mb-4">Enter your personal details and start your journey with us</p>
              <button className="btn-secondary" onClick={handleToggle}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// export const EMAIL=email;
export default Sign;
