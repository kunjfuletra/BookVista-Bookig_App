import { useNavigate } from "react-router-dom";
import "./logout.css";
import { useState } from "react";


function Logout() {
    const [seed, setSeed] = useState(1);
    const navigate = useNavigate();
    const handleclick=()=>{

        localStorage.clear()
        setSeed(Math.random());
        window.location.reload(false);
          
        
    }
  return (
    
  <div onClick={handleclick}style={{cursor: "pointer"}}>
    <button className="navButton">
        Logout
    </button>
  </div>
  )
}

export default Logout