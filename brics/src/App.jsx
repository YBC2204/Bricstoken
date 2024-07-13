import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/Login";

function App() {
  

  return (
    <div className="min-h-screen w-full flex flex-col bg-black font-source">
      <BrowserRouter>
   <Routes>
   <Route path="/" element={<Login/>}/>
     <Route path="/home" element={<Home/>}/>



   </Routes>
   
    
   </BrowserRouter>
    </div>
      
  )
}

export default App
