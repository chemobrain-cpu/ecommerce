import React, { useState, useCallback } from 'react'
import styles from './signup.module.css'
import FormInput from "../../elements/input-card/input"
import Formheader from "../../elements/main-header/authheader"
import Submit from "../../elements/form-submit/formsubmit"
import Space from "../../basic_components/space/space"
import { adminlogin } from "../../store/action/userAppStorage";
import { useDispatch } from "react-redux";
//importing modals
import LoadingModal from "../../elements/Modal/LoadingModal"
import InfoModal from "../../elements/Modal/InfoModal"
//imprting from react-router

import {useNavigate} from "react-router-dom"

let AdminLogin = () => {
    let [userEmail, setUserEmail] = useState("")
    let [userPassword, setUserPassword] = useState("")

    //loaders state
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isSucessful, setIsSucessful] = useState(false)

    //initialising redux
    let dispatch = useDispatch()
    let navigate = useNavigate()
     
    let setFormDetails = useCallback(e => {
      
        if (e.formName === "userEmail") {
            let formValue = e.value
            setUserEmail(formValue)

        } else if (e.formName === "userPassword") {
            let formValue = e.value
            setUserPassword(formValue)

        }
    }, [])

    let submitHandler = useCallback(async (e) => {
        e.preventDefault()
        if (userEmail && userPassword) {
            //submitt form 
            setIsLoading(true)
            let res = await dispatch(adminlogin({
                userEmail,
                userPassword,
            }))
            if (!res.bool) {
                setIsLoading(false)
                setIsError(res.message)

            } else {
                setIsLoading(false)
                setIsSucessful("sucessfully submitted")
                //navigate to product page
                setTimeout(()=>{
                    navigate("/adminproducts")
                },2000)
            }

        }
    },[adminlogin,userEmail, userPassword,dispatch,navigate])

    let closeModal = useCallback((e) => {
        setTimeout(()=>{
            setIsError(false)
        },2000)
    }, [navigate])

   

   
    if(isLoading){
        return <LoadingModal text='please wait'/>

    }
    if(isSucessful){
        
        return <InfoModal close={closeModal}  text='submitting form' text={isSucessful}/>

    }

    return (
        <div className={styles.screen} >

            <Formheader className={styles.togglemenu} title='login' link='adminsignup' />

            <form onSubmit={submitHandler}>

                <div className={styles.formscreen}>
                    <img src={'../../girlphone.png'} className={styles.img} />
                    <div className={styles.right} >

                        <Space className={styles.space} />

                     

                        <FormInput
                            icon='edit'
                            label='Email'
                            type='email'
                            className={styles.input}
                            setFormDetails={setFormDetails}
                            formName="userEmail"
                            setFormDetails={setFormDetails}

                        />
                        <FormInput
                            icon='edit'
                            label='Password'
                            type='password'
                            className={styles.input}
                            formName="userPassword"
                            setFormDetails={setFormDetails}

                        />
                        {isError?<p style={{ color: 'rgb(180, 60, 126)', fontSize: '1.2rem' }}>{isError}</p>:""}

                        <Submit action="Login" />
                    </div>

                </div>

            </form >
        </div>
    )
}

export default AdminLogin