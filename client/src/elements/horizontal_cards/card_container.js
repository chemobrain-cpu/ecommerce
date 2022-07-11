import React from "react"
import styles from './card_container.module.css'


let Container = ( props)=>{
   

    return <div className={`${styles.horizontal_cards} ${props.className}`} >
        {props.children}
    </div>
}

export default React.memo(Container)