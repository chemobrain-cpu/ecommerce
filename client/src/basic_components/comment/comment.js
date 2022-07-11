import React, { useState} from 'react'
import styles from './comment.module.css'
import SendMessage from '../sendMessage/sendMessage'
import CommentInfo from '../../elements/commentInfo/commentInfo'
import ReplyComment from './replyComment'
//importing redux fun
import { useNavigate} from "react-router-dom"
import { replyComment,deleteComment } from "../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";

let MainComment = (props) => {
    let [comment, setComment] = useState(false)
      //initialising redux
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { user } = useSelector(state => state.userAuth)

    const send = async () => {
        props.hide(comment)
        setComment(prev => !prev)
    }

    let sendReplyComment = async(data) => {
        props.hide(comment)
        setComment(prev => !prev)
        if(!user){
            navigate('/login')
            return
        }
        data.user = user
        let res = await dispatch(replyComment(data))
    }
   

    let deleteMainComment = async()=>{
        if(!user){
            navigate("/login")
            return
        }
        let commentId = props.id
        let userId = user._id
        let res = await dispatch(deleteComment({commentId,userId}))
    }

    return (<div className={`${styles.mainComment} `}>
        <div className={`${styles.actualMain} `}>
            < CommentInfo text={props.text} username={props.username} photo={props.photo} />
            {comment ? null : <div className={styles.function}>
                <span className="material-icons" onClick={send}>reply</span>
                {user && user.username === props.username &&<span className="material-icons" onClick={deleteMainComment}>delete</span>}
                <span >{props.date}</span>
            </div>}
        </div>

        {comment ? <SendMessage
            style={{marginTop:"10px"}}
            placeholder="reply comment"
            id={props.id}
            sendComment={sendReplyComment} /> : null}
        {/* this component will be visible if we are in product page*/}
        {props.commentPage && props.replies && props.replies.map(data=><ReplyComment data={data} key={data._id} />)}
        
        

    </div>
    )





}

export default React.memo(MainComment)