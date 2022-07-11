import React,{useEffect} from "react"
import styles from "./copycard.module.css"


const CopyCard = (props)=>{
    useEffect(()=>{
        
    })
    return <div className={props.className}>
    <input className={styles.input} value='Eazkon/servicedetail/opo6YHUT%%JJUIYrvicedetail/opo6YHUT%rvicedetail/opo6YHUT%'
        autoCorrect='false' />
    <button className={styles.button} onClick={() => {
        alert('copied Eazkon/servicedetail/opo6YHUT%%JJUIYrvicedetail/opo6YHUT%rvicedetail/opo6YHUT%')
    }}>
        copy
    </button>


</div>


}


export default CopyCard