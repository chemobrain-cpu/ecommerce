import React from 'react'
import styles from './home.module.css'

import Newsletter from "../../../elements/news_letter/newsletter"
import NavBar from "../../../elements/nav-bar/navbar"
import Testimonial from "../../../elements/testimonial/testimonial"
import ProductSection from "../../../elements/homepageproduct/productsection"

import Service from "../../../elements/service/service"
import Description from "../../../elements/description/description"
import Action from "../../../elements/Action/action"
//importing redux fun
import Container from "../../../elements/horizontal_cards/card_container"
import Footer from "../../../elements/footer/footer"

let Home = () => {
    
    return (< >
        <NavBar />
        <div style={{ height: '90px' }}>
            <p>.</p>

        </div>
        <Description 
        header="OBAS IGBINEDION GLOBAL LIMITED" text="Dealers of Furnitures,Roofing Tiles,Doors,Water Collector,Aluminium & Accesosories" 
        imageUrl={`../../roofs.jpg`} />
        <div style={{ height: '200px' }}>
            <p>.</p>

        </div>
        <ProductSection />
        {/* action*/}
        <Action />

        <Container className={styles.collection}>
            <div className={styles.imageCard}>
                <img src={`../../door.png`} alt='product image' style={{ width: '200px', height: '150px', marginBottom: '40px' }} />
                <p>Explore Doors</p>
            </div>

            <div className={styles.imageCard}>
                <img src={`../../cuboard.png`} alt='product image' style={{ width: '200px', height: '150px', marginBottom: '40px' }} />
                <p>Explore Furnitures</p>

            </div>

            <div className={styles.imageCard}>
                <img src={`../../cuboard3.png`} alt='product image' style={{ width: '200px', height: '150px', marginBottom: '40px' }} />
                <p>Explore Chairs </p>

            </div>
            <div className={styles.imageCard}>
                <img src={`../../cabinet.png`} alt='product image' style={{ width: '200px', height: '150px', marginBottom: '40px' }} />
                <p>Explore Cabinets</p>

            </div>

            <div className={styles.imageCard}>
                <img src={`../../office_chair.png`} alt='product image' style={{ width: '200px', height: '150px', marginBottom: '40px' }} />
                <p>Explore Office Chairs</p>

            </div>
            <div className={styles.imageCard}>
                <img src={`../../roof.png`} alt='product image' style={{ width: '200px', height: '150px', marginBottom: '40px' }} />
                <p>Explore roofing sheets</p>

            </div>



        </Container>

        <Description header="QUALITY AND AFFORDABLE ROOFING SERVICES" imageUrl={`../../obaschair.jpg`} />
        <div style={{ height: '200px' }}>
            <p>.</p>
        </div>
        <ProductSection />
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