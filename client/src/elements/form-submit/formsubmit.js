import React from "react"
import styles from './formsubmit.module.css'

let Submit = (props) => {
  
    return (<div className={styles.button_containers} >

            <button className={styles.signup}>
                {props.action}

            </button>
        </div>)
}

export default React.memo(Submit)