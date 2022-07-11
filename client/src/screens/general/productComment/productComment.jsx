import React, { useState, useCallback, useEffect, useRef } from 'react'
import styles from './productComment.module.css'
import Formheader from "../../../elements/main-header/formhead"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import SendMessage from '../../../basic_components/sendMessage/sendMessage'
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import Comment from "../../../elements/commentContainer/comment"
import ErrorModal from "../../../elements/Modal/ErrorModal"
import EmptyModal from "../../../elements/Modal/EmptyModal"
//importing redux fun
import { useNavigate, useParams } from "react-router-dom"
import { getProductComment, mainComment, loadComments } from "../../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";

let Products = () => {
    // let [comments, setComments] = useState([])
    let [comment, setComment] = useState(false)
    const endRef = useRef(null)
    //loaders state
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [isSucessful, setIsSucessful] = useState(false)
    //initialising redux
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { id } = useParams()
    let { user, comments } = useSelector(state => state.userAuth)

    useEffect(async () => {
        //before anything loader
        setIsLoading(true)
        //get comment
        let res = await dispatch(getProductComment(id))
        console.log(res)
        if (!res.bool) {
            if (!res.status) {
                setIsLoading(false)
                setIsError(res.message)
            } else {
                //dispatch an action to update comment on redux

            }
        } else {
            setIsLoading(false)
            await dispatch(loadComments(res.message))
        }
        endRef.current.scrollIntoView()

    }, [dispatch, getProductComment, loadComments])

    let closeModal = useCallback((e) => {
        setIsLoading(false)
        setIsError(false)
        setIsSucessful(false)
    }, [])

    

    let hideInput = useCallback((value) => {
        let bool = !value
        setComment(bool)
    }, [])

    //props.sendComment({ comment, id: props.id })
    let sendComment = useCallback(async (data) => {
        let res = await dispatch(mainComment(data))
        if (false) {

            //setIsError(res.message)
        } else {
            //dispatch the sent comment to the redux store
        }
    }, [mainComment])

    try {
        if (isError) {
            return <ErrorModal close={closeModal} error='an error occureed' />
        }
        if (isLoading) {
            return <LoadingModal text='please wait' />
        }
        return (
            <>
                <Formheader className={styles.togglemenu} title='Login' />
                <div className={styles.screen} >
                    <div className={styles.left}>
                        <SideBar />
                    </div>
                    <div className={styles.right} >

                        <div className={styles.commentscreen}>

                            {comments.length === 0 && <div><EmptyModal emptyText="Be first to comment" /></div>}

                           

                            <Comment comments={comments}
                                className={styles.comment}
                                triggerInput={hideInput}
                                commentPage={true}
                            />
                            <div ref={endRef}>
                            </div>

                        </div>
                        {comment ? '' : <SendMessage className={styles.sendMessage} placeholder="type your comment" id={id} sendComment={sendComment} />}

                    </div>

                </div>

            </>
        )


    } catch (err) {
        console.log(err)
    }


}

export default Products