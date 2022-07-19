import React from 'react'
import { useNavigate } from "react-router-dom"
import Newsletter from "../../../elements/news_letter/newsletter"
import NavBar from "../../../elements/nav-bar/navbar"
import Testimonial from "../../../elements/testimonial/testimonial"
import ProductSection from "../../../elements/homepageproduct/productsection"

import Service from "../../../elements/service/service"
import Description from "../../../elements/description/description"
import Action from "../../../elements/Action/action"
//importing redux fun

import Footer from "../../../elements/footer/footer"

let Home = () => {
    let navigate = useNavigate()
    let goToShop = ()=>{
        navigate("/products")

    }
    
    return (< >
        <NavBar />
        
        <Description 
        header="OBAS IGBINEDION LIMITED" text="Dealers of Furnitures,Roofing Tiles,Doors,Water Collector,Aluminium & Accesosories" 
        imageUrl={`../../roofs.jpg`} />

        <div style={{ height: '150px' }}>
            <p>.</p>

        </div>
      


        
        <ProductSection />

        <div style={{height:'20vh',display:'flex',alignItems:"center",justifyContent:'center'}}>

        <button onClick={goToShop} style={{fontSize:'1rem',color:"rgb(95, 95, 95)",backgroundColor:"var(--color-chocolate)",width:"150px",height:'60px',color:'white'}}> view more</button>


        </div>
        {/* action*/}
        <Action />


        <Description header="QUALITY AND AFFORDABLE SERVICES" imageUrl={`../../obaschair.jpg`} />
        <div style={{ height: '200px' }}>
            <p>.</p>
        </div>

        {/* our quality*/}
        <Service />

        {/* testimonial*/}
        <Testimonial />

        {/* news letter*/}
        <Newsletter />

        <Footer/>
    </>)
}

export default Home