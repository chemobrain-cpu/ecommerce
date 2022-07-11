import React, { useEffect } from "react"
import styles from './imageCard.module.css';
import Aos from "aos"
import 'aos/dist/aos.css'

let Image = (props) => {
    useEffect(() => {
        Aos.init({ duration: 1200, offset: 20 }, [])
    })
    let id = props.id



    return <div className={`${styles.product_ads} ${props.className}`} onClick={() => {
    }} >
        <img src={props.imageUrl} alt='product image' className={styles.propertyImage} />
        <div className={styles.buttons_container}>
            <div text='Edit product' className={styles.chat1} onClick={() => {
                props.editProduct(id)

            }}>
                <span style={{ fontSize: '1rem', fontWeight: 200 }} >

                    {props.view}

                </span>

            </div>
            

        </div>




    </div>
}

export default React.memo(Image)