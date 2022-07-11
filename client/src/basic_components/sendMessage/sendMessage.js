import React, { useState} from 'react'
import styles from './sendMessage.module.css'


let SendMessage = (props) => {
    let [comment,setComment] = useState("")
    const sendCommentHandler = ()=>{
        if(comment){
              props.sendComment({comment,id:props.id})
        }
    }
    let changeHandler= (e)=>{
        let value = e.target.value
        setComment(value)
    }
    
    try {
        return (<div className={`${styles.sendreply} ${props.className} `}  style={props.style} >
                    <input placeholder={props.placeholder} 
                    value = {comment} onChange = {changeHandler} />
                    <div onClick={sendCommentHandler}>
                        <span className="material-icons">
                            send
                        </span>
                    </div>
                </div>
        )
    } catch (err) {
        console.log(err)
    }


}

export default React.memo(SendMessage)