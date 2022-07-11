import React from 'react'
import styles from './action.module.css'
import { useNavigate } from "react-router-dom"
import Container from "../horizontal_cards/card_container"





let Action = () => {
    let navigate = useNavigate()
   

    return <Container className={styles.con} data-aos='fade-down'>

        {/* action */}
        <div className={styles.action}>
            <img src={`../../roofs.jpg`} alt='product image' className={styles.actionimage} />
            <div>
                <p>Best and Durable Roofing </p>
                <button onClick={()=>navigate("/products")}>call now</button>
            </div>
        </div>
        <div className={styles.action}>
            <img src={`../../beds.jpg`} alt='product image' className={styles.actionimage} />
            <div>
                <p>Get the Best and Affordable Furnitures</p>
                <button onClick={()=>navigate("/products")}>shop now</button>

            </div>
        </div>
        <div className={styles.action}>
            <img src={`../../wardrobe.jpg`} alt='product image' className={styles.actionimage} />
            <div>
                <p>Quick Delivery</p>
                <button onClick={()=>navigate("/products")}>shop now</button>

            </div>
        </div>
    </Container>
}

export default React.memo(Action)