import React,{useCallback,useState} from 'react'
import styles from './signup.module.css'
import SelectInput from "../../elements/input-card/select"
import FormInput from "../../elements/input-card/input"
import Submit from "../../elements/form-submit/formsubmit"
import Formheader from "../../elements/main-header/authheader"
import Space from "../../basic_components/space/space"
//redux import
import {  signup} from "../../store/action/userAppStorage";
import { useDispatch } from "react-redux";
//importing modals
import LoadingModal from "../../elements/Modal/LoadingModal"
import ErrorModal from "../../elements/Modal/ErrorModal"
import InfoModal from "../../elements/Modal/InfoModal"
//imprting from react-router

import {useNavigate} from "react-router-dom"

let Signup = () => {
    let [username,setUsername] = useState("")
    let [userPhoneNumber,setUserPhoneNumber] = useState("")
    let [userEmail,setUserEmail] = useState("")
    let [userPassword,setUserPassword] = useState("")
    let [userConfirmPassword,setUserConfirmPassword] = useState("")
    let [userCountry,setUserCountry] = useState("")
    let [userState,setUserState] = useState("")
    //loaders state
    let [isLoading,setIsLoading] = useState(false)
    let [isError,setIsError] = useState(false)
    let [isSucessful,setIsSucessful] = useState(false)

    //initialising redux
    let dispatch = useDispatch()
    //initialiasing router
    let navigate = useNavigate()

    let setFormDetails =useCallback(e=>{
        if(e.formName === "userUsername"){
            let formValue =  e.value
            setUsername(formValue)
            
        }else if(e.formName === "userPhoneNumber"){
            let formValue =  e.value
            setUserPhoneNumber(formValue)

        }else if(e.formName === "userEmail"){
            let formValue =  e.value
            setUserEmail(formValue)

        }else if(e.formName === "userPassword"){
            let formValue =  e.value
            setUserPassword(formValue)

        }else if(e.formName === "userComfirmPassword"){
            let formValue =  e.value
            setUserConfirmPassword(formValue)

        }else if(e.formName === "userCountry"){
            let formValue =  e.value
            setUserCountry(formValue)

        }else if(e.formName === "userState"){
            let formValue =  e.value
            setUserState(formValue)
        }
    },[])

    let submitHandler =useCallback(async(e) =>{
        e.preventDefault()
        if(username && userPhoneNumber && userEmail &&userPassword && userConfirmPassword){
            //submitt form 
          
            setIsLoading(true)

            let res = await dispatch(signup({
                username,
                userPhoneNumber,
                userEmail,
                userPassword,
                userConfirmPassword,
                userState,
                userCountry

            }))
            if(!res.bool){
                setIsLoading(false)
                setIsError(res.message)

            }else{
                setIsLoading(false)
                setIsSucessful("sucessfully submitted")
                //navigate to product page
                navigate("/products")
            }
        }
    },[username,userPhoneNumber, userEmail,userPassword ,userConfirmPassword , userState , userCountry,dispatch,signup,navigate])

    let closeModal = useCallback((e)=>{
        navigate("/signup")
    },[])

    if(isLoading){
        return <LoadingModal text='submitting form'/>

    }
    if(isSucessful){
        
        return <InfoModal close={closeModal}  text='submitting form' text={isSucessful}/>

    }


    return (<>
        <div className={styles.screen} >
        <Formheader className={styles.togglemenu} title='signup' link='login' />
            <form onSubmit={submitHandler}>
                <div className={styles.formscreen}>
                    <img src={'../../girlphone.png'} className={styles.img} alt='img'/>
                    <div className={styles.right} >
                    <Space className={styles.space}/>



                        <FormInput
                            icon='edit'
                            label="username"
                            type='text'
                            className={styles.input}
                            formName="userUsername"
                            setFormDetails={setFormDetails}

                        />
                      

                        <SelectInput
                            icon='menu'
                            label='Select Country'
                            option_1='Nigeria'
                            option_2='Nigeria'
                            option_3='Ghana'
                            option_4='Kenya'
                            formName="userCountry"
                            setFormDetails={setFormDetails}
                        />
                        <SelectInput
                            icon='menu'
                            label='Select State'
                            option_1='Nigeria'
                            option_2='Nigeria'
                            option_3='Ghana'
                            option_4='Kenya'
                            formName="userState"
                            setFormDetails={setFormDetails}
                        />

                        <FormInput
                            icon='edit'
                            label='Phone Number'
                            type='number'
                            className={styles.input}
                            formName="userPhoneNumber"
                            setFormDetails={setFormDetails}

                        />
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
                        <FormInput
                            icon='edit'
                            label='Confirm Password'
                        
                            type='password'
                            className={styles.input}
                            formName="userComfirmPassword"
                            setFormDetails={setFormDetails}

                        />
                        {isError?<p style={{ color: 'rgb(180, 60, 126)', fontSize: '1.2rem' }}>{isError}</p>:""}
                        <Submit action="Signup"  />

                    </div>
                </div>
            </form>
        </div>

    </>)
}

export default Signup