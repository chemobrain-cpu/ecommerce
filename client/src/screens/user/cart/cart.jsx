import React, { useState, useCallback } from 'react'
import styles from './cart.module.css'
import Formheader from "../../../elements/main-header/formhead"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import Container from "../../../elements/horizontal_cards/card_container"
import CartCard from "../../../elements/cartCard/cartCard"
import CartNav from "../../../elements/cartNav/cartNav"
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import ErrorModal from "../../../elements/Modal/ErrorModal"
//importing redux fun
import { useNavigate } from "react-router-dom"
import { emptyCart, incrementCartItem, decrementCartItem } from "../../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";
import EmptyModal from "../../../elements/Modal/EmptyModal"

let Cart = () => {
    //loaders state
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isSucessful, setIsSucessful] = useState(false)

    //initialising redux
    let dispatch = useDispatch()

    let navigate = useNavigate()
    let { user, cart } = useSelector(state => state.userAuth)

    let closeModal = useCallback((e) => {
        setIsLoading(false)
        setIsError(false)
        setIsSucessful(false)
    }, [])

    let increment = useCallback((id) => {
        dispatch(incrementCartItem(id))
    }, [dispatch,incrementCartItem])

    let decrement = useCallback((id) => {
        dispatch(decrementCartItem(id))
    },[dispatch,decrementCartItem])

    let navigateToShipping = useCallback(() => {
        navigate("/shipping")

    }, [navigate])

    let navigateToProduct = useCallback(() => {
        //cancel cart
        dispatch(emptyCart())
        navigate("/products")

    }, [dispatch,emptyCart,navigate])



    
    if(cart.cartItems.length === 0){
        return <>
        <Formheader className={styles.togglemenu} title='Login' />
        <div className={styles.screen} >
            <div className={styles.left}>
                <SideBar />
            </div>
            <div className={styles.right} >
                <EmptyModal emptyText="no items in cart"/> 
            </div>
        </div>
    
    </>
    }


    if (isError) {
        return <ErrorModal close={closeModal} error='an error occureed' />
    }
    if (isLoading) {
        return <LoadingModal text='loading products for you' />
    }
  
   
  



    return (
        <>
            <Formheader className={styles.togglemenu} />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>

                <div className={styles.right} >
                    <CartNav current="cart" />

                    <div className={styles.dashboardname}>
                        <h2 style={{ fontWeight: 100, fontSize: '1.6rem', paddingLeft: '10px', width: '100%' }}>Items in cart</h2>

                    </div>
                    <div className={styles.innerright}>
                        <div className={styles.leftsection}>
                            <Container>
                                {cart.cartItems.map(data => <CartCard
                                    key={data.product._id}
                                    id={data.product._id}
                                    decrement={decrement}
                                    increment={increment}
                                    name={data.product.NameOfProduct}
                                    no={data.no}
                                    amount={data.amount}
                                    imageUrl={`http:\\\\localhost:8080\\${data.product.photos}`} />)}



                            </Container>


                        </div>
                        <div className={styles.rightsection}>

                            <table className={styles.table}>
                                <tbody>
                                    <tr>
                                        <td>sub-total</td>
                                        <td>{cart.totalAmount}</td>

                                    </tr>
                                    <tr>
                                        <td>shipping</td>
                                        <td>free</td>
                                    </tr>

                                </tbody>

                            </table>



                        </div>

                    </div>

                    <div className={styles.submitbutton}>
                        <div className={styles.nextcon} onClick={navigateToShipping}>
                            <p>Next</p>

                        </div>
                        <div className={styles.cancelcon} onClick={navigateToProduct}>
                            <p>Cancel</p>
                        </div>

                    </div>

                </div>





            </div>

        </>
    )



}

export default Cart