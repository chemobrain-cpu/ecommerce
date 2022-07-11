import React,{useCallback} from 'react'
import styles from './notificationcard.module.css'
import CircularImage from "../../basic_components/round-image/roundImage"
import moment from "moment"
//importing from react-router
import { useNavigate } from "react-router-dom"
//importing redux fun
import { readNotification} from "../../store/action/userAppStorage";
//initialising redux library
import { useDispatch, useSelector } from "react-redux";


let NotificationCard = (props) => {
    //initialising redux
    let dispatch = useDispatch()
      //initialising router
    let navigate = useNavigate()
    let {user} = useSelector(state => state.userAuth)
  
 

    let clickHandler = useCallback(async(id) =>{
        navigate(`/comment/${props.linkId}`)
         let data = {
             user:user,
             notificationId:props.id
         }
         let res = await dispatch(readNotification(data))
         if (!res.bool) {
           return
        } else {
            navigate(`/comment/${props.linkId}`)
        }
    },[readNotification,navigate,dispatch,props,user])

    let deleteHandler = useCallback(async(id) =>{
        //do nothing yet
    },[readNotification,navigate,dispatch,props,user])


    return (
            <div className={styles.notification} onClick={()=>clickHandler(props.id)} style={{backgroundColor:props.status == "unread"?"#cdd1d8":"#dadde6"}}>
                <div className={styles.info}>

                    <div className={styles.img}>
                        <CircularImage imageUrl={`http:\\\\localhost:8080\\${props.user.photo}`} className={styles.image} />

                    </div>
                    <div className={styles.data}>
                        <p><span>{props.user.username}</span>{props.text}</p>
                        <div className={styles.date}>
                            <p>{moment(props.date).from(moment())}</p>
                            <span className="material-icons" onClick={()=>deleteHandler(props.id)}>delete</span>

                        </div>

                    </div>

                </div>
            </div>
    )
}

export default React.memo(NotificationCard)



















