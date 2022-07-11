import React,{useEffect } from 'react'
import styles from './service.module.css'
import Aos from "aos"
import 'aos/dist/aos.css'

let Service = () => {
    useEffect(() => {
        Aos.init({ duration: 1500, offset: 20 }, [])
    })
    return (<div className={styles.services} data-aos='fade-down'>
       <img src={`../../obaschair.jpg`} className={styles.serviceImage}/>
       <h2>Why do you prefer us</h2>
       <div className={styles.qualitiesContainer}>

           <div className={styles.qualities}>
               <p>Proven track record</p>

           </div>
           <div className={styles.qualities}>
               <p>Gauranteed quality and longetivity</p>
               
           </div>
           <div className={styles.qualities}>
           <p>Double protection from rust and correction</p>
               
           </div>
       </div>
        </div>)
}

export default React.memo(Service)