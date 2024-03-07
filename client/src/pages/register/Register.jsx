import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";
import Swal from 'sweetalert2';

const Register= () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email:undefined,
    password: undefined,
    retypePassword: undefined, // New state variable for retype password
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.retypePassword) {
      // Check if passwords match
      dispatch({ type: "REGISTER_FAILURE", payload: { message: "Passwords do not match" } });
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: 'password does not match',
      });
      return;
    }





    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: res.data.details,
      });

      navigate("/login")
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
      Swal.fire({
        icon: 'error',
        title: 'Registration Error',
        text: err.response.data.message,
      });

    }
  };


  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
         <input
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          onChange={handleChange}
          className="lInput"
        />

        <input
          type="text"
          placeholder="country"
          id="country"
          onChange={handleChange}
          className="lInput"
        />

      <input
          type="text"
          placeholder="city"
          id="city"
          onChange={handleChange}
          className="lInput"
        />

      <input
          type="tel"
          placeholder="1234567890"
          id="phone"
          onChange={handleChange}
          className="lInput"
        />

        
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />

        <input
          type="password"
          placeholder="retype password" // New input for retype password
          id="retypePassword"
          onChange={handleChange}
          className="lInput"
        />

        <button disabled={loading} onClick={handleClick} className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;