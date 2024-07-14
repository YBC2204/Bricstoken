import  { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
const Transaction = () => {
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user

  const [proceed, setProceed] = useState(false); // State to track proceed action

  const userContainerRef = useRef(null);
  const [mail,setmail] =useState("");
  const [amt,setamt] =useState("");
  const[error,setError] = useState("");
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userContainerRef.current && !userContainerRef.current.contains(event.target)) {
        setSelectedUser(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const users = ["anjanakj000@gmail.com", "parveen123@gmail.com", "jijojohny13@gmail.com", "anson210@gmail.com"];

  const renderUsers = () => {
    
    return users.map((user) => (
      
      <button
        key={user}

        className={`user-item bg-slate-800 p-3 rounded-md hover:border-b hover:scale-105 hover:cursor-pointer ${
          selectedUser === user ? "bg-slate-500  text-purple-600 scale-105 border-b" : ""


        }`}
        onClick={() => {
          setSelectedUser(user);
          setmail(user);}}
      >
        {user}
      </button>
    ));
  };


  const handleProceedClick = () => {
    setProceed(true);
  };

 

  const handleProceed = async (e) => {
    //e.preventDefault();
  console.log(amt);
   console.log(mail); 
  try {
      const token = localStorage.getItem('token');
     
     console.log(token)
      const response = await axios.post('http://localhost:3000/api/token/transactions', {"email":mail,"amount":amt},
       { headers: {
          'authorization': `Bearer ${token}`,
        }
      });
      console.log(response)
      // Handle response
    } catch (error) {
      console.error('Buy Token failed:', error);
      setError('Buy Token failed. Please try again later.');
    }
  };

  return (

    <div className={`relative ${proceed ? "bg-gray-900" : ""}`}>
      <div className="flex flex-col gap-4 px-4 py-5 mt-10 border-2 rounded-[20px] border-white bg-gray-900 mx-auto w-[50%]">
        <div className="font-semibold uppercase text-2xl text-center tracking-widest">
          Transaction
        </div>
        <div>
          <div className="input-box flex items-center gap-1">
            <Search color="" />
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input p-2 text-black rounded-xl bg-gray-300 placeholder:text-black w-full"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search user"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-2 px-4 py-2 rounded-xl">
          <div className="text-xl font-semibold">Contacts</div>
          <div className="flex flex-col gap-2 font-semibold">{renderUsers()}</div>
          {selectedUser && (
            <button
              className="proceed-button bg-purple-600 text-white px-4 py-2 rounded-md mt-2"
              onClick={handleProceedClick}
            >
              Proceed
            </button>
          )}
        </div>
      </div>
      {proceed && (
        <div className="bg-black bg-opacity-50 absolute inset-0 flex items-center justify-center ">
          <div className="btoken-container ">
          
            <div className="bg-gray-800 relative" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '110px', height: '60vh', borderRadius: '10px' }}>
            <div className="absolute top-2 right-4" onClick={()=>setProceed(false)}><CloseIcon fontSize="large" color=""/></div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label center-item font-bold text-xl">Enter Amount</label>
                <div className="join">
                  <div className="grow">
                    <div className='center-item drop-item'>
                      <input id="amount" name="amount" className="center-item input join-item ip-padding" type="text" placeholder="" 
                        value={amt}
                        onChange={(e) => setamt(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='center-item drop-item'>
                    <select id="asset" name="asset" className="select-bordered select join-item ip-padding">
                      <option value="" disabled>Select Asset</option>
                      <option value="native">XLM</option>
                      <option value="native">BRIC</option>
                    </select>
                  </div>
                </div>
                <div className='center-item'>
                  <button type="button" className=" flex gap-1 px-3 py-2 border-2 border-green-700 text-green-600 rounded-lg hover:bg-green-600 hover:text-white font-bold"
                  onClick={()=> handleProceed()}>Send<ArrowOutwardIcon/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}



    </div>
  );
};

export default Transaction;
