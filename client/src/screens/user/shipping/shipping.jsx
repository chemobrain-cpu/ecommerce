import React, { useState, useCallback } from 'react'
import styles from './shipping.module.css'
import Formheader from "../../../elements/main-header/formhead"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import FormInput from "../../../elements/input-card/input"
import CartNav from "../../../elements/cartNav/cartNav"
import CartTable from "../../../elements/cartTable/carttable"
//importing redux fun
import { useNavigate } from "react-router-dom"
import { emptyCart,shipp } from "../../../store/action/userAppStorage";
import { useDispatch } from "react-redux";

let Shipping = () => {
    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [address, setAddress] = useState("")
    let [country, setCountry] = useState("")
    let [city, setCity] = useState("")
    let [state, setState] = useState("")
    let [phoneNumber, setPhoneNumber] = useState("")

  
    //initialising redux
    let dispatch = useDispatch()

    let navigate = useNavigate()
  
   
    /*
        let closeModal = useCallback((e) => {
            setIsLoading(false)
            setIsError(false)
            setIsSucessful(false)
        }, [])
        */


    let setFormDetails = useCallback(e => {
        if (e.formName === "firstName") {
            let formValue = e.value
            setFirstName(formValue)

        } else if (e.formName === "lastName") {
            let formValue = e.value
            setLastName(formValue)

        } else if (e.formName === "address") {
            let formValue = e.value
            setAddress(formValue)

        } else if (e.formName === "country") {
            let formValue = e.value
            setCountry(formValue)

        } else if (e.formName === "city") {
            let formValue = e.value
            setCity(formValue)

        } else if (e.formName === "state") {
            let formValue = e.value
            setState(formValue)

        } else if (e.formName === "phoneNumber") {
            let formValue = e.value
            setPhoneNumber(formValue)

        }
    }, [])
    let navigateToPayment = useCallback(() => {
        /*algorithm*/
        if (firstName && lastName && address && country &&
            city && state && phoneNumber) {
            dispatch(shipp({
                firstName,
                lastName,
                address,
                country, 
                city,
                state,
                phoneNumber
            }))
            navigate("/payment")
        }
        //
    },[firstName,
        lastName,
        address,
        country, 
        city,
        state,
        phoneNumber,shipp,dispatch,navigate])

    let navigateToProduct = useCallback(() => {
        //cancel cart
        dispatch(emptyCart())
        navigate("/products")

    },[dispatch,emptyCart,navigate])


    return (
        <>
            <Formheader className={styles.togglemenu} title='Login' />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>

                <div className={styles.right} >
                    <CartNav current="details" />

                    <div className={styles.dashboardname}>
                        <h2>Shipping details</h2>

                    </div>

                    <div className={styles.innerright}>
                        <div className={styles.leftsection}>
                            <div className={styles.form}>
                                <FormInput
                                    icon='edit'
                                    label='first name'
                                    type='text'
                                    className={styles.input}
                                    setFormDetails={setFormDetails}
                                    formName="firstName"
                                    setFormDetails={setFormDetails}


                                />
                                <FormInput
                                    icon='edit'
                                    label='last name'
                                    type='text'
                                    className={styles.input}
                                    formName="lastName"
                                    setFormDetails={setFormDetails}

                                />
                                <FormInput
                                    icon='edit'
                                    label="address"
                                    type='text'
                                    className={styles.input}
                                    formName="address"
                                    setFormDetails={setFormDetails}

                                />
                                <FormInput
                                    icon='edit'
                                    label='Country'
                                    type='text'
                                    className={styles.input}
                                    formName="country"
                                    setFormDetails={setFormDetails}

                                />
                                <FormInput
                                    icon='edit'
                                    label='City'
                                    type='text'
                                    className={styles.input}
                                    formName="city"
                                    setFormDetails={setFormDetails}

                                />
                                <FormInput
                                    icon='edit'
                                    label='State'
                                    type='text'
                                    className={styles.input}
                                    formName="state"
                                    setFormDetails={setFormDetails}
                                />
                                <FormInput
                                    icon='edit'
                                    label='phonenumber'
                                    type='number'
                                    className={styles.input}
                                    formName="phoneNumber"
                                    setFormDetails={setFormDetails}

                                />

                            </div>



                        </div>
                        <div className={styles.rightsection}>

                            <CartTable total="250000" />

                        </div>

                    </div>

                    <div className={styles.submitbutton}>
                        <div className={styles.nextcon} onClick={navigateToPayment}>
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

export default Shipping