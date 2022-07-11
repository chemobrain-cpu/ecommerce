import React from "react"
import styles from './product.module.css';
import { useNavigate } from "react-router-dom"
import {useSelector } from "react-redux";

let PropertyCard = (props) => {
    let navigate = useNavigate()
    let id = props.id

    let navigateToDetail = () => {
        navigate("/products")

        
    }

    let navigateToComment = () => {
           
       
    }


    return <div className={`${styles.product_ads} ${props.className}`} >

        <img src={props.imageUrl} alt='product image' className={styles.propertyImage} onClick={navigateToDetail}/>
        
         <div className={styles.buttons_container}>
            <div text='Edit product' className={styles.chat1}>
                <span style={{ fontSize: '1rem', fontWeight: 200 }} onClick={() => {
                    props.addToCart(id)
                }}>
                    Add To Cart
                </span>

            </div>
            <div text='' className={styles.chats2}>
                <span className="material-icons" onClick={navigateToComment}>

                    chat

                </span>

            </div>

        </div>

        <h1 className={styles.type}>{props.name}</h1>
        <div className={styles.amount}>
            <h3 className={styles.price}><img style={{width:'10px',height:'10px'}} src="../../nigeria-naira.png"/>{props.amount} </h3>
            <h3 className={styles.discount}><img style={{width:'10px',height:'10px'}} src="../../nigeria-naira.png"/>
                {props.amount * 2}
            </h3>

        </div>

    </div>
}

export default PropertyCard