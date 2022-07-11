import React from 'react'
import styles from "./EmptyModal.module.css"
import "react-activity/dist/Sentry.css"

let ErrorModal = React.memo((props) => {
    return (<>
        <div className={styles.empty}>
            <img src={`../../girlphone.png`} alt='product image' className={styles.marketimage} />
            <p>{props.emptyText}</p>

        </div></>)
})

export default ErrorModal