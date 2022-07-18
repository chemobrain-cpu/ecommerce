import React,{useEffect } from 'react'
import styles from './footer.module.css'

import { useNavigate } from "react-router-dom"
//importing redux fun
import { useSelector } from "react-redux";
import Aos from "aos"
import 'aos/dist/aos.css'

let Footer = () => {
    useEffect(() => {
        Aos.init({ duration: 1500, offset: 20 }, [])
    })
    //initialising redux
    let navigate = useNavigate()
    let { cart } = useSelector(state => state.userAuth)


    return ( <div className={styles.addressContainer}>
            <div className="textwidget custom-html-widget" data-aos='fade-down'>     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.1000338199156!2d5.779570814765897!3d5.552186595974376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1041ad625025100d%3A0x6f14642d0ae4c417!2sHIMALONE%20GLOBAL%20SERVICES!5e0!3m2!1sen!2sng!4v1625428147727!5m2!1sen!2sng" width="100%" height="450" frameborder="0" style={{ border: 0, filter: "brightness(50%)" }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></div>

            <div className={styles.address} data-aos='fade-down'>
                <div className={styles.addressInfo}>
                    <div className={styles.address_one}>
                        <h2>1ST OFFICE ADDRESS</h2>
                        <p>DELTIOPE SHOPPING PLAZA by Flobal Hotel Junction, Okuokoko Town Okpe L.G.A,Delta State</p>

                    </div>
                    <div className={styles.address_two}>
                    <h2> 2ND OFFICE ADDRESS</h2>
                    <p>Opposite Ogheneovo filling station ikwheghwu, Agbarho   Town Ughelli north L.G.A,Delta State</p>

                    </div>
                    

                </div>
              






            </div>

            <div className={styles.social}>
                <p>FOLLOW US</p>
                <div className={styles.socialcontainer}>
                    <p>
                    <span className="material-icons">facebook</span>
                    </p>
                    
                </div>
            </div>





        </div>)
}

export default Footer