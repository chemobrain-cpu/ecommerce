import React,{useEffect} from "react"
import styles from './input.module.css'


let Input =(props)=>{
     useEffect(()=>{
        
    })
    return <input placeholder={props.placeholder} className={`${styles.input} ${props.className}`} onChange={props.onChange} />


}



export default Input