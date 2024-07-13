import React, { useState } from "react";
import { Search } from "@mui/icons-material";

const Transaction = () => {
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // State to track selected user

  const users = ["Person1", "Person2", "Person3", "Person4"];

  const renderUsers = () => {
    return users.map((user) => (
      <button
        key={user}
        className={`user-itembg-slate-800 rounded-md hover:border-b hover:scale-105 hover:cursor-pointer ${
          selectedUser === user ? "bg-slate-500  text-white" : ""
        }`}
        onClick={() => setSelectedUser(user)}
      >
        {user}
      </button>
    ));
  };

  const proceedButton = (
    <button className="proceed-button bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
      Proceed
    </button>
  );

  return (
    <div className="flex flex-col gap-4 px-3 py-5 mt-10 border-2 rounded-[20px] border-white bg-gray-900 mx-auto w-[40%]">
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
      <div className="w-3/4 flex flex-col gap-2 px-4 py-2 rounded-xl">
        <div className="text-xl font-semibold">Contacts</div>
        <div className="flex flex-col gap-2">{renderUsers()}</div>
        {selectedUser && proceedButton}
      </div>
    </div>
  );
};

export default Transaction;
