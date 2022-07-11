import React from 'react'
import styles from './sendmessage.module.css'
import Card from "../card/card"


let SendMessage = (props) => {
    return <Card className={`${styles.cardinput} ${props.className}`} >
        <input placeholder='' />
        <button>
            <span className="material-icons">
                send
            </span>
        </button>
    </Card>
}

export default React.memo(SendMessage)
