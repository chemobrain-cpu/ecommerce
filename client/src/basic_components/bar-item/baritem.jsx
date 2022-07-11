import React from "react"
import styles from './baritem.module.css'


const BarItem = (props) => {
    return <div onClick={() => {
        if (props.onClick) {
            props.onClick()
        }
    }}><div  className={`${styles.linkitem} ${styles.active}` }>
            <span className="material-icons">
                {props.icon}
            </span>

            <h3>{props.name}</h3>

            {props.number ? <div className={styles.number} >
                <p className={styles.p}>{props.number}</p>
            </div> : ''}
        </div>
        
    </div>

}


export default React.memo(BarItem)