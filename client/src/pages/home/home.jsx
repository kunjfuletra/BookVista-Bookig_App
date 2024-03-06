import React from 'react'
import "./home.css"
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import Featured from '../../components/featured/Featured'
import Propertylist from '../../components/propertylist/Propertylist'
import Propertylisttwo from '../../components/propertylisttwo/Propertylisttwo'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/footer'
function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <Propertylist/>
        <h1 className="homeTitle">Home guests love</h1>
        <Propertylisttwo/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Home
