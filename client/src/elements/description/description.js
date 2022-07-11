import React,{useEffect } from 'react'
import styles from './description.module.css'
import { useNavigate } from "react-router-dom"
import Aos from "aos"
import 'aos/dist/aos.css'

let Description = (props) => {
    useEffect(() => {
        Aos.init({ duration: 1500, offset: 20 }, [])
    })
    let navigate = useNavigate()

    return (<div className={styles.description} data-aos='fade-down'>
        <img src={props.imageUrl} alt='product image' className={styles.image} />
        <div className={styles.content}>
            <h2>{props.header}</h2>
            <p >{props.text}</p>
            <div className={styles.button}>
                <button onClick={()=>navigate("/products")}> shop now</button>
            </div>


        </div>




    </div>
    )
}

export default React.memo(Description)