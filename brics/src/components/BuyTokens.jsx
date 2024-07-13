import React, { useState } from 'react';
import axios from 'axios'

const BuyToken = () => {
  const [amount, setAmount] = useState('');

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('amount', amount);

      const response = await axios.post('http://localhost:3000/api/token/buy-token', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle response
    } catch (error) {
      console.error('Buy Token failed:', error);
      setError('Buy Token failed. Please try again later.');
    }
  };
  return (
    <div className="btoken-container">
    <div className="card" style={{ display:'flex',alignItems:'center',justifyContent:'center',backgroundColor: '#141519', padding: '20px', height:'50vh',borderRadius: '10px' }}>
      {/* #7563ec */}
        <div className="mb-3">
        <select className=" drop-item center-item form-select" aria-label="Default select example">
         <option selected>Select Country</option>
        <option value="Brazil">Brazil</option>
        <option value="Brazil">Russia</option>
        <option value="India">India</option>
        <option value="India">China</option>
        <option value="South Africa">South Africa</option>
        <option value="3">United Arab Emirates</option>
        
        <option value="Iran">Iran</option>
        <option value="Egypt">Egypt</option>
        <option value="Ethopia">Ethopia</option>
        <option value="Russia">Russia</option>
</select>
          {/* <div className="dropdown drop-item center-item">
            <button name = "country"  className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Select Country
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" onClick={()=>{country.value="Brazil"}}>Brazil</a></li>
              <li><a className="dropdown-item">India</a></li>
              <li><a className="dropdown-item">United Arab Emirates</a></li>
              <li><a className="dropdown-item">South Africa</a></li>
              <li><a className="dropdown-item">Iran</a></li>
              <li><a className="dropdown-item">Egypt</a></li>
              <li><a className="dropdown-item">Ethopia</a></li>
              <li><a className="dropdown-item">Russia</a></li>
              <li><a className="dropdown-item">China</a></li>
            </ul>
          </div> */}
          <label htmlFor="exampleInputEmail1" className="form-label center-item">Enter Amount</label>
          <div className="join">
            <div className="grow">
              <div className='center-item drop-item'>
                <input  
                value={amount}
                onChange={(e) => setAmount(e.target.value)} id="amount" name="amount" className="input-bordered center-item input join-item ip-padding" type="text" placeholder="1.00" />
              </div>
              {/* style={{ width: '50%' }} */}
            </div>
            <div className='center-item drop-item'>
            <select id="asset" name="asset" className="select-bordered select join-item ip-padding">
              <option value="" disabled="">Select Asset</option>
              <option value="native">XLM</option>
              <option value="native">BRIC</option>
            </select></div>
          </div>
          {/* <input style={{width:'25%'}} className="input-field" type="n" placeholder="Email" /> */}
          <div className='center-item'>
          <button type="button" className="btn btn-outline-danger center-item" onClick={handleSubmit}>Buy Now</button>
          </div>
        </div>
     
    </div>
    </div>
  );
};

export default BuyToken;