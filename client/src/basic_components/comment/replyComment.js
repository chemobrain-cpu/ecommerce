import React,{useCallback} from 'react'
import styles from './comment.module.css'
import CommentInfo from '../../elements/commentInfo/commentInfo'
import moment from "moment"
//importing redux fun
import { useDispatch, useSelector } from "react-redux";
import { deleteReplyComment} from "../../store/action/userAppStorage";

let Comment = (props) => {
    let { user } = useSelector(state => state.userAuth)
    let dispatch = useDispatch()

    let deleteReply = useCallback(async()=>{
        let data = {}
        data.user = user
        data.replyCommentId = props.data._id
        let res = await dispatch(deleteReplyComment(data))

    },[deleteReplyComment,props])

    try {
        return (
            <div className={styles.replyComment}>

                {props.data.isAdmin ? <CommentInfo
                    text={props.data.text}
                    username={props.data.admin.username}
                    photo={props.data.admin.photo}
                /> : <CommentInfo
                    text={props.data.text}
                    username={props.data.user.username}
                    photo={props.data.user.photo}
                />}

                {props.data.isAdmin && user && user._id.toString() === props.data.admin._id.toString() && <div className={styles.function}>
                    <span className="material-icons" onClick={deleteReply}>delete</span>
                    <span >{moment(props.data.date).from(moment())}</span>
                </div>}

                {!props.data.isAdmin && user && user._id.toString() === props.data.user._id.toString() && <div className={styles.function}>
                    <span className="material-icons"  onClick={deleteReply}>delete</span>
                    <span >{moment(props.data.date).from(moment())}</span>
                </div>}

                {!props.data.isAdmin && user && user._id.toString() !== props.data.user._id.toString() && <div className={styles.function}>
                    <span className="material-icons"></span>
                    <span >{moment(props.data.date).from(moment())}</span>
                </div>}

                {props.data.isAdmin && user && user._id.toString() !== props.data.admin._id.toString() && <div className={styles.function}>
                    <span className="material-icons"></span>
                    <span >{moment(props.data.date).from(moment())}</span>
                </div>}


                {props.data.isAdmin && !user && <div className={styles.function}>
                    <span className="material-icons"></span>
                    <span >{moment(props.data.date).from(moment())}</span>
                </div>}

                {!props.data.isAdmin && !user && <div className={styles.function}>
                    <span className="material-icons"></span>
                    <span >{moment(props.data.date).from(moment())}</span>
                </div>}


            </div>

        )


    } catch (err) {
        console.log(err)

    }


}

export default React.memo(Comment)