import React,{useState} from 'react'
import styles from "./InfoModal.module.css"

let ErrorModal = React.memo((props) => {
  
    return (<>
        <div className={styles.modal} >
            <p className={styles.p}> {props.error} ... </p>
            <div className={styles.buttonContainer}>
                
                <div className={styles.button} onClick={()=>{
                    props.close("error")
                }}>
                    <span className="material-icons">
                        close
                    </span>
                    
                </div>

            </div>
        
        </div>

    </>)
})

export default ErrorModal