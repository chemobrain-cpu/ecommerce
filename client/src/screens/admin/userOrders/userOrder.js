import React, { useState, useCallback, useEffect } from 'react'
import styles from './userorder.module.css'
import Formheader from "../../../elements/main-header/formhead"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import Container from "../../../elements/horizontal_cards/card_container"
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import ErrorModal from "../../../elements/Modal/ErrorModal"
//importing react router
import { useNavigate, useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"
import moment from "moment"
//importing redux fun
import { getUsers, getUserOrders } from "../../../store/action/userAppStorage";
import { useDispatch } from "react-redux";
import EmptyModal from "../../../elements/Modal/EmptyModal"

let UserOrders = () => {
    let [orders, setOrders] = useState([])
    //loaders state
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)

    //initialising redux
    let dispatch = useDispatch()

    let navigate = useNavigate()
    let { id } = useParams()



    useEffect(async () => {
        //before anything loader
        setIsLoading(true)
        let res = await dispatch(getUserOrders(id))
        if (!res.bool) {
            if (!res.status) {
                setIsError(res.message)
            } else {
                if (res.status === "admin") {
                    navigate("/adminlogin")
                } else if (res.status === "user") {
                    navigate("/login")
                }
            }
        } else {
            setIsLoading(false)
            setOrders(res.message.orders)
        }
    }, [dispatch, getUsers])


    let closeModal = useCallback((e) => {
        navigate("/adminproducts")
    }, [])



    if (isError) {
        return <ErrorModal close={closeModal} error='an error occureed' />
    }
    if (isLoading) {
        return <LoadingModal text='loading data' />
    }
    if (orders.length === 0) {
        return <>
            <Formheader className={styles.togglemenu} title='Login' />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>
                <div className={styles.right} >
                    <EmptyModal emptyText="No order yet" />
                </div>
            </div>

        </>
    }


    return (
        <>
            <Formheader className={styles.togglemenu} title='Login' />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>

                <div className={styles.right} >
                    <div className={styles.leftsection}>

                        <div className={styles.recentOrders}>

                            <div className={styles.dashboardname}>
                                <h2>Orders of {orders.length > 0 && orders[0].User.username}</h2>
                            </div>

                            <Container>
                                <table className={styles.table}>
                                    <thead >
                                        <tr>
                                            <th>Date Ordered</th>

                                            <th>Items No</th>

                                            <th>TrackerId</th>

                                            <th>Status</th>

                                            <th></th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {
                                            orders.map(data => <tr
                                                key={data._id}>
                                                <td>{moment(data.date).format('MMMM d, YYYY')} </td>
                                                <td>{data.totalNo}</td>

                                                <td className={styles.warning}>{data.trackerId}</td>
                                                <td>{data.status}</td>
                                                <NavLink to={`/adminorder/${data._id}`}>
                                                    <td className={styles.primary}>Details</td>

                                                </NavLink>

                                            </tr>)
                                        }

                                    </tbody>

                                </table>

                            </Container>




                        </div>




                    </div>




                </div>





            </div>

        </>
    )



}

export default UserOrders