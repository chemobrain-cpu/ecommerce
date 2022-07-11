import React from "react"
import styles from './roundImage.module.css'


let CircularImage =(props)=>{
   
    return <img className={`${styles.image} ${props.className}`}   alt='user-photo' src={props.imageUrl} />
}
export default React.memo(CircularImage)