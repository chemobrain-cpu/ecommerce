import React, { useState, useCallback, useEffect } from 'react'
import styles from './orderDetail.module.css'
import Formheader from "../../../elements/main-header/formhead"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import Container from "../../../elements/horizontal_cards/card_container"
import OrderCard from "../../../elements/cartCard/orderCard"
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import ErrorModal from "../../../elements/Modal/ErrorModal"
//importing redux fun
import { useNavigate, useParams } from "react-router-dom"
import { getOrder, emptyCart } from "../../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"

let OrderDetail = () => {
    let [isOrder, setIsOrder] = useState(false)
    //loaders state
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let { id } = useParams()

    //initialising redux
    let dispatch = useDispatch()

    let navigate = useNavigate()
    let { user, cart } = useSelector(state => state.userAuth)


    useEffect(async () => {
        //before anything loader
        setIsLoading(true)
        let res = await dispatch(getOrder(id))
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
            //navigate to product page
            setIsOrder(res.message)
        }
    }, [dispatch, getOrder, navigate])

    let navigateToShipping = useCallback(() => {
        navigate("/shipping")

    }, [navigate])

    let navigateToProduct = useCallback(() => {
        //cancel cart
        dispatch(emptyCart())
        navigate("/products")

    }, [dispatch, navigate, emptyCart])

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
            <Formheader className={styles.togglemenu} />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>

                <div className={styles.right} >

                    <div className={styles.innerright}>
                        <div className={styles.leftsection}>
                            <div className={styles.dashboardname}>
                                <h2>Order Detail</h2>
                            </div>
                            {isOrder ? <Container>
                                {isOrder.products.map(data => <OrderCard
                                    key={data.product._id}
                                    id={data.product._id}

                                    name={data.product.NameOfProduct}
                                    no={data.no}
                                    amount={data.amount}
                                    imageUrl={`http:\\\\localhost:8080\\${data.product.photos}`} />)}
                            </Container> : ""}



                        </div>
                        <div className={styles.rightsection}>


                            {isOrder ? <table className={styles.table}>
                                <tbody>
                                    <tr>
                                        <td>sub-total</td>
                                        <td>{isOrder.totalAmount}</td>
                                    </tr>
                                    <tr>
                                        <td>delivery date</td>
                                        <td>{moment(isOrder.dateOfOrder).format('MMMM d, YYYY')}</td>

                                    </tr>
                                    <tr>
                                        <td>order status</td>
                                        <td>{isOrder.status}</td>

                                    </tr>

                                </tbody>


                            </table> : ""}
                            {isOrder ? <table className={styles.table}>
                                <tbody>
                                    <tr>
                                        <td>first name</td>
                                        <td>{isOrder.shipping_address.firstName}</td>


                                    </tr>
                                    <tr>
                                        <td>last name</td>
                                        <td>{isOrder.shipping_address.lastName}</td>

                                    </tr>
                                    <tr>
                                        <td>address</td>
                                        <td>{isOrder.shipping_address.country}</td>

                                    </tr>
                                    <tr>
                                        <td>country</td>
                                        <td>{isOrder.shipping_address.country}</td>

                                    </tr>
                                    <tr>
                                        <td>city</td>
                                        <td>{isOrder.shipping_address.city}</td>

                                    </tr>
                                    <tr>
                                        <td>state</td>
                                        <td>{isOrder.shipping_address.state}</td>

                                    </tr>
                                    <tr>
                                        <td>phone</td>
                                        <td>{isOrder.shipping_address.phoneNumber}</td>

                                    </tr>

                                </tbody>
                            </table> : ""}

                        </div>

                    </div>
                    <div className={styles.submitbutton}>
                        <div className={styles.nextcon} onClick={navigateToShipping}>
                            <p>back</p>

                        </div>
                        <div className={styles.cancelcon} onClick={navigateToProduct}>
                            <p>edit</p>
                        </div>

                    </div>


                </div>





            </div>

        </>
    )




}

export default OrderDetail