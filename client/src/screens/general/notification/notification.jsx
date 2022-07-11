import React, { useState, } from 'react'
import styles from './notification.module.css'

import Formheader from "../../../elements/main-header/adminheader"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import NotificationCard from "../../../elements/notification_card/notificationcard"

//importing modals
import EmptyModal from "../../../elements/Modal/EmptyModal"

//importing redux funand  react-router
import { useSelector } from "react-redux";





let Notification = () => {

    let { notifications } = useSelector(state => state.userAuth)

    if (notifications.length === 0) {
        return <>
            <Formheader className={styles.togglemenu} title='Login' />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>
                <div className={styles.right} >
                    <EmptyModal emptyText="no notification yet" />
                </div>
            </div>

        </>
    }


    return (
        <>
            <Formheader className={styles.togglemenu} />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>

                <div className={styles.right} >
                  

                    {notifications.reverse().map(data => {
                        if (data.isAdmin) {
                            return <NotificationCard
                                key={data.id}
                                user={data.admin}
                                date={data.date}
                                status={data.status}
                                photo={data.photo}
                                username={data.username}
                                text={data.text}
                                linkId={data.linkId}
                                id={data.id} />
                        } else {
                            return <NotificationCard
                                key={data.id}
                                user={data.user}
                                date={data.date}
                                status={data.status}
                                photo={data.user.photo}
                                text={data.text}
                                linkId={data.linkId}
                                id={data.id} />
                        }
                    }

                    )}
                </div>

            </div>
        </>

    )
}
/*
let notification = {
    //user who post the product
    admin: userExist,
    idOfProduct: productId,
    date: Date.now(),
    status: "unread",
    photo: user.photo,
    isAdmin: true,
    text: "Admin commented on the product",
    linkId: modifyProduct._id
}


*/

export default Notification