import React, { useState, useCallback, useEffect } from 'react'
import styles from './commentInfo.module.css'



let CommentInfo = (props) => {

    try {
        return (
                <div className={styles.comment}>
                    <div className={styles.img}>
                        {props.photo?<img
                            src={`http:\\\\localhost:8080\\${props.photo}`}
                            className={styles.userimg}
                        />:<img
                        src="../../smile.png"
                        className={styles.userimg}
                    />}
                        
                    </div>
                    <div className={styles.commentContent}>
                        <span>
                            {props.username}
                        </span>
                        {props.text}

                    </div>

                </div>
               
            
        )


    } catch (err) {
        console.log(err)

    }


}

export default CommentInfo