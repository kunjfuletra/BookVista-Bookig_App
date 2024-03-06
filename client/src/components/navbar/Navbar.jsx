import {Link, useNavigate} from 'react-router-dom';
import "./navbar.css"
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import Logout from '../logout/Logout';

function Navbar() {
  
  const navigate = useNavigate();
  const handleclick =()=>{
    navigate("/login")
  }

  const handleclick2 =()=>{
    navigate("/register")
  }
  
  const {user} = useContext(AuthContext);
  return (
    <div className="navbar">
    <div className="navContainer">
      <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
        <span className="logo">BookVista</span>
      </Link>
      {user ?(<div className='abcc'>
        <div className="username">

        { user.username }
        </div>

        <div className="logout">
          <Logout/>
        </div>
        
        
        </div>) : (
        <div className="navItems">
          <button className="navButton" onClick={handleclick2}>Register</button>
          <button className="navButton" onClick={handleclick}>Login</button>
        </div>
      )}
    </div>
  </div>
  )
}

export default Navbar
