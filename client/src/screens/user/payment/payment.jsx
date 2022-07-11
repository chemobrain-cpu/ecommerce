import React, { useState, useCallback } from 'react'
import styles from './payment.module.css'
import Formheader from "../../../elements/main-header/formhead"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import FormInput from "../../../elements/input-card/input"
import CartNav from "../../../elements/cartNav/cartNav"
import CartTable from "../../../elements/cartTable/carttable"
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import ErrorModal from "../../../elements/Modal/ErrorModal"
//importing redux fun
import { useNavigate } from "react-router-dom"
import { makePayment,getProducts } from "../../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";

let Payment = () => {
    let [cardNumber, setCardNumber] = useState("")
    let [cvvNumber, setCvvNumber] = useState("")
    let [expiryDate, setExpiryDate] = useState("")

    //loaders state
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState("")
    let [isSucessful, setIsSucessful] = useState(false)

    //initialising redux
    let dispatch = useDispatch()

    let navigate = useNavigate()
    let { user, cart } = useSelector(state => state.userAuth)
    
    let pay = useCallback(async() => {
        if (cardNumber && cvvNumber) {
            //payment algorithm
            if(cart.cartItems.length > 0){
                setIsLoading(true)
                try{
                    let res = await dispatch(makePayment({
                        cardNumber,
                        cvvNumber ,
                        expiryDate
                    }))
                    if (!res.bool) {
                        if(!res.status){
                            setIsLoading(false)
                            setIsError(res.message)
                        }else{
                            if(res.status === "admin"){
                                return navigate("/adminlogin")
                            }else if(res.status === "user"){
                                return navigate("/login")
                            }
                        }
                    } else {
                        return navigate("/products")
                    }
                }catch(err){
                }
            }
        }

    },[makePayment,cardNumber,
        cvvNumber ,
        expiryDate,dispatch,navigate])

    let cancel = () => {

    }




    let closeModal = useCallback((e) => {
        navigate("/products")
    }, [navigate])


    let setFormDetails = useCallback(e => {
        if (e.formName === "cardNumber") {
            let formValue = e.value
            setCardNumber(formValue)

        } else if (e.formName === "cvvNumber") {
            let formValue = e.value
            setCvvNumber(formValue)

        } else if (e.formName === "expiryDate") {
            let formValue = e.value
            setExpiryDate(formValue)

        }
    }, [])

    if (isError) {
        return <ErrorModal close={closeModal} error='an error occureed' />
    }
    if (isLoading) {
        return <LoadingModal text='loading products for you' />
    }



    return (
        <>
            <Formheader className={styles.togglemenu} title='Login' />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>

                <div className={styles.right} >
                    <CartNav current="payment"/>

                    <div className={styles.dashboardname}>
                        <h2>Shipping details</h2>

                    </div>

                    <div className={styles.innerright}>
                        <div className={styles.leftsection}>
                            <div className={styles.form}>
                                <FormInput
                                    icon='edit'
                                    label='Card Number'
                                    type='number'
                                    className={styles.input}
                                    setFormDetails={setFormDetails}
                                    formName="cardNumber"
                                    setFormDetails={setFormDetails}


                                />
                                <FormInput
                                    icon='edit'
                                    label='cvv'
                                    type='number'
                                    className={styles.input}
                                    formName="cvvNumber"
                                    setFormDetails={setFormDetails}

                                />
                                <FormInput
                                    icon='edit'
                                    label="expiry Date"
                                    type='date'
                                    className={styles.input}
                                    formName="expiryDate"
                                    setFormDetails={setFormDetails}

                                />


                            </div>



                        </div>
                        <div className={styles.rightsection}>

                            <CartTable total="250000" />
                        </div>

                    </div>

                    <div className={styles.submitbutton}>
                        <div className={styles.nextcon} onClick={pay}>
                            <p>Order Now</p>

                        </div>
                        <div className={styles.cancelcon} onClick={cancel}>
                            <p>Cancel</p>
                        </div>

                    </div>










                </div>





            </div>

        </>
    )



}

export default Payment