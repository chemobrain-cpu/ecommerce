import React, { useCallback, useState } from 'react'
import styles from "./InfoModal.module.css"
import "react-activity/dist/Sentry.css"

let InfoModal = React.memo((props) => {
    let [username, setUsername] = useState("")

    return (<>
        <div className={styles.modal} >
            
                <div className={styles.cancel} onClick={()=>{
                    props.close('info')
                }}>
                    <span className="material-icons">
                        close

                    </span>

                </div>
                <img src={'../../smile.png'} alt='product image' className={styles.Image} />
                <div className={styles.info}>
                    <p>{props.text}</p>

                </div>





        </div>

    </>)
})
export default InfoModal