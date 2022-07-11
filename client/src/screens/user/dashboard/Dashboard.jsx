import React, { useState, useCallback, useEffect } from 'react'
import styles from './dashboard.module.css'
import Formheader from "../../../elements/main-header/formhead"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"

import Container from "../../../elements/horizontal_cards/card_container"
import DashboardCardContainer from "../../../elements/dashboard-card-container/dashboardcardcontainer"
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import ErrorModal from "../../../elements/Modal/ErrorModal"
//importing react router
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"

//importing redux fun
import { getOrders } from "../../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";

let Dashboard = () => {
    let [orders, setOrders] = useState([])
    let [totalAmount, setTotalAmount] = useState([])
    //loaders state
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)

    //initialising redux
    let dispatch = useDispatch()

    let navigate = useNavigate()


    useEffect(async () => {
        //before anything loader
        setIsLoading(true)
        let res = await dispatch(getOrders())
        if (!res.bool) {
            if (!res.status) {
                setIsLoading(false)
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
            setTotalAmount(res.message.totalAmount)
        }
    }, [dispatch, getOrders, navigate])

    let closeModal = useCallback((e) => {
        navigate("/products")
    }, [navigate])


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


                    <div className={styles.rightsection}>
                        <div className={styles.dashboardname}>
                            <h2>Dashboard</h2>
                        </div>

                        <DashboardCardContainer />
                    </div>

                    <div className={styles.leftsection}>


                        <div className={styles.recentOrders}>
                            <div className={styles.dashboardname}>
                                <h2>Recent Order</h2>
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
                                                <td>{"5/09"} </td>
                                                <td>{data.totalNo}</td>

                                                <td className={styles.warning}>{data.trackerId}</td>
                                                <td>{data.status}</td>

                                                <td className={styles.primary} onClick={() => navigate(`/order/${data._id}`)}>Details</td>



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

export default Dashboard