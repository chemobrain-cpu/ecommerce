import React, { useState} from 'react'
import styles from './userCard.module.css'

let UserCard = (props) => {
    return (
        <>
            <div className={styles.user} onClick={props.onClick}>
                <img src={props.imageUrl} alt='product image' className={styles.userPic} />
                <h3>{props.username}</h3>
                <div className={styles.userButtons}>
                    
                    <div className={styles.edit}>
                        <span >
                            about
                        </span>

                    </div>
                </div>

            </div>

        </>
    )
}

export default React.memo(UserCard)