import Nalozi from "./components/Nalozi";
import Dodaj from "./components/Dodaj";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navibar from "./components/NaviBar";
import Odobri from "./components/Odobri"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>             
          <Route path="/" element={<Login/>}/>
          <Route path="/Navigacija" element={<Navibar/>}>         
            <Route path="/Navigacija/" element={<Nalozi/>}/>
            <Route path="/Navigacija/Dodaj" element={<Dodaj/>}/>
            <Route path="/Navigacija/Odobri" element={<Odobri/>}/>
          </Route>           
        </Routes>      
      </BrowserRouter>
    </>
  );
}

export default App;
