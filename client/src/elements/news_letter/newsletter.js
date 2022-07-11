import React,{useEffect } from 'react'
import styles from './newsletter.module.css'
import Aos from "aos"
import 'aos/dist/aos.css'

let Newsletter = () => {
    useEffect(() => {
        Aos.init({ duration: 1500, offset: 20 }, [])
    })
    return (<div className={styles.newsletter} data-aos='fade-down'>
            <h2>NEWSLETTER</h2>
            <p>Join our newsletter to get exclusive contents, offers, services and first access to products.</p>
            <div className={styles.sendMessage}>
                <input />
                <button>send</button>
            </div>
        </div>)
}

export default React.memo(Newsletter)