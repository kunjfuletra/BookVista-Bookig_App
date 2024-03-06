import React from 'react'
import "./propertylisttwo.css"
import useFetch from '../../hooks/useFetch'
function Propertylisttwo() {
    const {data,loading,error,} = useFetch("/hotels?featued=true&limit=4")

  return (
    <div className="plt">
    {loading ? (
      "Loading"
    ) : (
      <>
        {data.map((item) => (
          <div className="pltItem" key={item._id}>
            <img className='pltImg'

              src={item.photos[0]}
              alt=""
              
            />
            <span className="pltName">{item.name}</span>
            <span className="pltCity">{item.city}</span>
            <span className="pltPrice">Starting from ${item.cheapestPrice}</span>
            {item.rating && <div className="pltpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>}
          </div>
        ))}
      </>
    )}
  </div>
    

    
  )
}

export default Propertylisttwo
