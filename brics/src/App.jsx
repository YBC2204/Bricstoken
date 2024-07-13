import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';


function App() {
  

  return (
    <div className="min-h-screen w-full flex flex-col bg-black font-source">
      <BrowserRouter>
   <Routes>
   <Route path="/" element={<Home/>}/>
     <Route path="/home" element={<Home/>}/>



   </Routes>
   
    
   </BrowserRouter>
    </div>
      
  )
}

export default App
