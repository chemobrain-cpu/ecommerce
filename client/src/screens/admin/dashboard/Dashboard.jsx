import React, { useState, useCallback, useEffect } from 'react'
import styles from './dashboard.module.css'
import Formheader from "../../../elements/main-header/formhead"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import Container from "../../../elements/horizontal_cards/card_container"
import DashboardCardContainer from "../../../elements/dashboard-card-container/dashboardcardcontainer"
import UserCardContainer from "../../../elements/dashboard-card-container/usercardcontainer"
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import ErrorModal from "../../../elements/Modal/ErrorModal"
//importing react router
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import moment from "moment"
//importing redux fun
import { getAdminOrders, getUsers } from "../../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";

let Dashboard = () => {
    let [orders, setOrders] = useState([])
    let [totalAmount, setTotalAmount] = useState([])
    let [users, setUsers] = useState([])
    //loaders state
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)

    //initialising redux
    let dispatch = useDispatch()

    let navigate = useNavigate()
    let { user, cart } = useSelector(state => state.userAuth)

    useEffect(async () => {
        //before anything loader
        setIsLoading(true)
        let res = await dispatch(getAdminOrders())
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
            setOrders(res.message.orders)
            setTotalAmount(res.message.totalAmount)
            //another asynchronous request
            setIsLoading(true)
            let resMsg = await dispatch(getUsers())
            if (!resMsg.bool) {
                if (!resMsg.status) {
                    setIsLoading(false)
                    setIsError(resMsg.message)
                } else {
                    if (resMsg.status === "admin") {
                        navigate("/adminlogin")
                    } else if (resMsg.status === "user") {
                        navigate("/login")
                    }
                }
            } else {
                setIsLoading(false)
                setUsers(resMsg.message)
                //another asynchronous request
            }

        }
    }, [dispatch, getUsers])

    let closeModal = useCallback((e) => {
        navigate("/adminproducts")
    }, [])
    let navigateHandler = useCallback((id) => {
        navigate(`/userorders/${id}`)
    }, [navigate])



    if (isError) {
        return <ErrorModal close={closeModal} error='an error occureed' />
    }

    if (isLoading) {
        return <LoadingModal text='loading data' />
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
                                <h2>Recent Users</h2>
                            </div>
                            <UserCardContainer navigateHandler={navigateHandler} 
                            users={users}/>
                            
                        </div>



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

export default Dashboard