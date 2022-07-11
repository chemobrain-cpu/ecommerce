import React from "react"
import styles from "./cartcard.module.css"


const OrderCard = (props) =>{
    return (<div className={styles.cartCard}>
        <div className={styles.cartImageCon}>
            <img
                src={props.imageUrl}
                alt='product image' className={styles.cartImage}
            />
    
        </div>
        <div className={styles.info}>
            <div className={styles.infoleft}>
                <h3>product name</h3>
                <h3>item no</h3>
                <h3>amount</h3>
    
            </div>
            <div className={styles.inforight}>
                <h3>{props.name}</h3>
                <h3>{props.no}</h3>
                <h3>{props.amount}</h3>
    
            </div>
    
        </div>
    
       
    
    </div>)
}



export default React.memo(OrderCard)