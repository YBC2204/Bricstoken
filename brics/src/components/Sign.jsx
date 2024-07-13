import React, { useState } from 'react';
import './Sign.css';
import axios from 'axios'; 

const Sign = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

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

  // http://localhost:3000/api/users/login
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [login, setLogin] = useState(false);

  const [name, setName] = useState('');

  const [walletAddress, setWallet] = useState('');
  const [registered, setRegistered] = useState(false);

  const registerfn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        username,
        selectedCountry,
        email,
        positionInCourt
      });
      setRegistered(true);
      // const token = response.data.token;
      // localStorage.setItem('token', token);
      // Redirect user to another page or do something else after successful registration
    }catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please try again later.');
    } 
    
    // catch (error) {
    //   console.error('Registration failed:', error);
    //   if (error.response && error.response.data && error.response.data.error) {
    //     setError(error.response.data.error);
    //   } else {
    //     setError('Registration failed. Please try again later.');
    //   }
    // }
  };

  if (registered) {
    redirect('/login')
  }

  const loginfn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
         email,password
      });
      // Assuming your backend returns a token upon successful login
      const token = response.data.token;
      console.log(token);
      localStorage.setItem('token', token);
      setLogin(true);
      // Retrieve the token from local storage
     // const storedToken = localStorage.getItem('token');
      // You can store the token in local storage or a cookie for future requests
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('Registration failed. Please try again later.');
      }
    }
  };

  if(login){
    redirect("/home")
  }
  return (
    <div className="h-screen bg-white flex justify-center items-center">
      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`}>
        <div className="form-container sign-up-container">
          <form className="bg-white p-6 rounded-lg" onSubmit={registerfn}>
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>
            <input 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field" type="text" placeholder="Name" />
            <input 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field" type="email" placeholder="Email" />
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="input-field"
            >
              <option value="" disabled>Select a BRICS country</option>
              {countries.map((country) => (
                <option key={country.value} value={country.value}>{country.label}</option>
              ))}
            </select>
            <input 
            value={password}
              onChange={(e) => setPassword(e.target.value)}
            className="input-field" type="password" placeholder="Password" />
            <button className="btn-primary" type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="bg-white p-6 rounded-lg" onSubmit={loginfn} >
            <h1 className="text-3xl font-bold mb-4 text-black text-center p-4">Sign in</h1>
            <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field" type="email" placeholder="Email" />
            <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field" type="password" placeholder="Password" />
            <a className="text-blue-500 mb-4 block" href="/">Forgot your password?</a>
            <button className="btn-primary" type="submit">Sign In</button>
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

export default Sign;
