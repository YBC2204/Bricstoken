import  { useEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";
import axios from 'axios';
const Transaction = () => {
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user
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
          selectedUser === user ? "bg-slate-500  text-white scale-105 border-b" : ""
        }`}
        onClick={() => {
          setSelectedUser(user);
          setmail(user);}}
      >
        {user}
      </button>
    ));
  };

  const proceedButton = (
    <button className="proceed-button bg-blue-500 text-white  px-5 mx-auto py-2 rounded-md mt-2 w-min">
      Proceed
    </button>
  );

  const handleProceed = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
     
     console.log(token)
      const response = await axios.post('http://localhost:3000/api/token/transaction', {"email":mail},{"amount":amt}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      // Handle response
    } catch (error) {
      console.error('Buy Token failed:', error);
      setError('Buy Token failed. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-5 mt-10 border-2 rounded-[20px] border-white bg-gray-900 mx-auto w-[50%]">
      <div className="font-semibold uppercase text-2xl text-center">
        Transaction
      </div>
      <div>
        <div className="input-box flex items-center gap-1">
          <Search color="primary" />
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
      <div className=" flex flex-col gap-2 px-4 py-2 rounded-xl"  ref={userContainerRef}>
        <div className="text-xl font-semibold">Contacts</div>
        <div className="flex flex-col gap-2 font-semibold">{renderUsers()}</div>
        {selectedUser && proceedButton}
      </div>
    </div>
  );
};

export default Transaction;
