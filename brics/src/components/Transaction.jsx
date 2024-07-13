import { useState } from "react";
import { Search } from "@mui/icons-material";

const Transaction = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const search_parameters = Object.keys(Object.assign({}, ...data));

  const search = (data) => {
    return data.filter((item) =>
      search_parameters.some((parameter) =>
        item[parameter].toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const users = ["Person1", "Person2", "Person3", "Person4"];

  const renderUsers = () => {
    return users.map((user) => (
      <div key={user} className="user-item  hover:border-b hover:scale-105 hover:cursor-pointer">
        {user}
      </div>
    ));
  };

  return (
    <div className="flex flex-col gap-4 px-3 py-5 mt-10 border-2 rounded-[20px] border-blue-900 mx-auto w-[60%]">
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
      </div>
    </div>
  );
};

export default Transaction;
