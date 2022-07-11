import React, { useState, useCallback, useEffect } from 'react'
import styles from './comment.module.css'
import MainComment from '../../basic_components/comment/comment'

import { useDispatch, useSelector } from "react-redux";

import moment from "moment"

let Comment = (props) => {
    //initialising redux
    let dispatch = useDispatch()
    //let navigate = useNavigate()

    let { user } = useSelector(state => state.userAuth)


    // this method should be send reply
    const hideHandler = useCallback((value)=>{
        props.triggerInput(value)
    },[])

    return (<div className={`${styles.commentContainer}  ${props.className}`}>
        {props.comments? props.comments.map(data => {
            if (data.isAdmin) {
                return <MainComment
                    commentPage={props.commentPage}
                    key={data._id}
                    id={data._id}
                    hide={hideHandler}
                    text={data.text}
                    date={moment(data.date).from(moment())}
                    photo={data.admin.photo}
                    username={data.admin.username}
                    replies={data.replies}
                //
                //productId={props.product._id}
                />

            }
            return <MainComment
                commentPage={props.commentPage}
                key={data._id}
                id={data._id}
                hide={hideHandler}
                text={data.text}
                date={moment(data.date).from(moment())}
                photo={data.user.photo}
                username={data.user.username}
                replies={data.replies}
            //
            //productId={props.product._id}

            />
        }):null}

    </div>
    )





}

export default Comment