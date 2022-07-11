import React from "react"
import styles from './card.module.css'

let Card = (props) =>{
    return (<div className={`${styles.cardContainer} ${props.className}`} >
        {props.children}
    </div>)
}


export default React.memo(Card)