import React from 'react'
import styles from './action.module.css'
import { useNavigate } from "react-router-dom"
import Container from "../horizontal_cards/card_container"





let Action = () => {
    let navigate = useNavigate()
   

    return <Container className={styles.con} data-aos='fade-down'>

        {/* action */}
        
       

        <div className={styles.action}>
            <img src={`../../wardrobe.jpg`} alt='product image' className={styles.actionimage} />
            <div>
               
                <button onClick={()=>navigate("/products")}>shop now</button>

            </div>
        </div>

        <div className={styles.action}>
            <img src={`../../action1.jpg`} alt='product image' className={styles.actionimage} />
            <div>
                
                <button onClick={()=>navigate("/products")}>shop now</button>

            </div>
        </div>


        <div className={styles.action}>
            <img src={`../../action2.jpg`} alt='product image' className={styles.actionimage} />
            <div>
           
                <button onClick={()=>navigate("/products")}>shop now</button>

            </div>
        </div>


        <div className={styles.action}>
            <img src={`../../action3.jpg`} alt='product image' className={styles.actionimage} />
            <div>
               
                <button onClick={()=>navigate("/products")}>shop now</button>

            </div>
        </div>

        <div className={styles.action}>
            <img src={`../../action4.jpg`} alt='product image' className={styles.actionimage} />
            <div>
                
                <button onClick={()=>navigate("/products")}>shop now</button>

            </div>
        </div>






    </Container>
}

export default React.memo(Action)