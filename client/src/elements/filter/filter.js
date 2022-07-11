import React,{useEffect} from "react"
import styles from './filter.module.css'


const Filter = (props) => {
    
    return <div className={`${styles.filter} ${props.className}`} >
        <div className={styles.left}>
            <div className = {styles.box}>

            </div>
            <div className = {styles.text}>
                <h3>Filter </h3>

            </div>

        </div>
        <div className={styles.right}>
            <select>
                <option selected>Country</option>
                <option>Ghana</option>
            </select>
            <select>
                <option>State</option>
                <option>Lagos</option>
            </select>
            
            
        </div>
        
    </div>
}

export default Filter