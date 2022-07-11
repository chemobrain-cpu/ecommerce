import React,{useCallback,useState} from 'react'
import styles from "./InfoModal.module.css"
import Sentry from "react-activity/dist/Sentry"
import  "react-activity/dist/Sentry.css"

let LoadingModal = React.memo((props) => {
    let [username,setUsername] = useState("")
  
    return (<>
        <div className={styles.modal} >
            <Sentry size={50}  className={styles.loader}/>
            <p className={styles.p}> {props.text} ... </p>
        
        </div>

    </>)
})

export default LoadingModal