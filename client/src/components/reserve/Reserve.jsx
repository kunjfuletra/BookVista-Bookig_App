import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useEffect } from "react";
import Swal from 'sweetalert2';

const Reserve = ({ setOpen, hotelId }) => {
  const [loading3, setLoading3] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  // const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  // console.log(data)
  // const { data2, loading2, error2 } = useFetch(`/hotels/room/${hotelId}`);
  // console.log(data2)

  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  console.log(data);
  
  const { data: data2, loading: loading2, error: error2 } = useFetch(`/hotels/find/${hotelId}`);
  console.log(data2);

  const { dates } = useContext(SearchContext);
  const {user} = useContext(AuthContext);

  
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];
    
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      setLoading3(true);
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      // setOpen(false);  
      
      const res2 = await axios.get(`/mail/sendmail?name=${user.username}&hotelname=${data2.name}`);
      // const res2 = await axios.get(`/mail/sendmail?name='kunj'&hotelname='taj'`)

      
      if(res2){
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'Mail has been sent with reservation details'
        });
      }
      
      navigate("/");

    } catch (err) {console.log(err);}
    finally{
      setLoading3(false);
    }
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          {loading3 ? (
            <div className="loader"></div>
          ) : (
            <span>Reserve Now!</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Reserve;