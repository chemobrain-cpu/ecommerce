import React from "react"
import styles from "./cartcard.module.css"


const CartCard = (props) =>{
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
                <h3><img style={{width:'10px',height:'10px'}} src="../../nigeria-naira.png"/>{props.amount}</h3>
    
            </div>
    
        </div>
    
        <div className={styles.cartbutton}>
            <div className={styles.add} onClick={()=>{
                props.increment(props.id)
            }}>
                <p className="material-icons">add</p>
    
            </div>
            <div className={styles.subtract} onClick={()=>{
                props.decrement(props.id)
            }}>
                <p className="material-icons">remove</p>
    
            </div>
    
    
        </div>
    
    </div>)
}



export default React.memo(CartCard)


