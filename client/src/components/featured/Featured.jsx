import "./featured.css"
import React from 'react'

import img from '../featured/jaipur.jpg'
import imgdelhi from '../featured/delhi.jpg'
import useFetch from "../../hooks/useFetch"
function Featured() {

    const {data,loading,error,} = useFetch("/hotels/countByCity?cities=gandhinagar,mumbai,ahmedabad")

  return ( 
      <div className="featured">
        { loading ? "Loading please Wait" : 
        <>
        <div className="featuredItem" id="jaipur">
            <img src="https://cf.bstatic.com/xdata/images/city/600x600/684657.jpg?k=66dc5035b43e9bb86b756e381e4fec2558064af4a63a8af17836725a854c03ee&o=" alt="Couldn't load" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Jaipur</h1>
                <h2>{data[0]} Properties</h2>
            </div>
        </div>

        <div className="featuredItem" id="mumbai">
            <img src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=" alt="Couldn't load" className="featuredImg" />
            <div className="featuredTitles">
                <h1>Mumabai</h1>
                <h2>{data[1]} properties</h2>
            </div>
        </div>

        <div className="featuredItem" id ="delhi">
            <img src={imgdelhi} alt="Couldn't load" className="featuredImg" />
            <div className="featuredTitles">
                <h1>New Delhi</h1>
                <h2>{data[2]} properties</h2>
            </div>
        </div> </>}
      </div>
  )
}

export default Featured
