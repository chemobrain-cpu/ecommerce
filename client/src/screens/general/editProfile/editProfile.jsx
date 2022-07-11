import React, { useState, useCallback, useEffect } from 'react'
import styles from './editProfile.module.css'
import FormInput from "../../../elements/input-card/input"
import Formheader from "../../../elements/main-header/formhead"
import Submit from "../../../elements/form-submit/formsubmit"
import Space from "../../../basic_components/space/space"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import ErrorModal from "../../../elements/Modal/ErrorModal"
import InfoModal from "../../../elements/Modal/InfoModal"
//importing redux fun
import { getUser, modifyUser } from "../../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";
import SelectInput from "../../../elements/input-card/select"
//importing from react-router
import { useNavigate } from "react-router-dom"

let EditProfile = () => {
    let [profilePhoto, setProfilePhoto] = useState("")
    let [photo, setPhoto] = useState("")
    let [country, setCountry] = useState("")
    let [state, setState] = useState("")
    let [username, setUsername] = useState("")
    //loaders state
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [isSucessful, setIsSucessful] = useState(false)
    //initialising redux
    let dispatch = useDispatch()
    let { user } = useSelector(state => state.userAuth)
    //initialising router
    let navigate = useNavigate()

    let setFormDetails = useCallback(e => {
        if (e.formName === "username") {
            let formValue = e.value
            setUsername(formValue)

        } else if (e.formName === "state") {
            let formValue = e.value
            setState(formValue)

        } else if (e.formName === "country") {
            let formValue = e.value
            setCountry(formValue)
        }
    }, [])

    let submitHandler = useCallback(async (e) => {
        e.preventDefault()
        if (username && country && state ) {
            //submitt form 
            setIsLoading(true)
            let res = await dispatch(modifyUser({
                username,
                country,
                state,
                photo
            }))
            if (!res.bool) {
                setIsLoading(false)
                setIsError(res.message)

            } else {
                setIsLoading(false)
                setIsSucessful("sucessfully submitted")
                //navigate to product page
                if (user) {
                    setTimeout(() => {
                        if (user && user.admin) {
                            navigate("/adminproducts")
                        } else {
                            navigate("/products")
                        }
                    }, 2000)
                } else {
                    navigate("/login")
                }
            }
        }
    },[modifyUser,username,
        country,
        state,
        photo,modifyUser,user,dispatch,navigate])

    let closeModal = useCallback((e) => {
        setIsLoading(false)
        setIsError(false)
        setIsSucessful(false)
    }, [])

    let changePhoto = useCallback((e) => {
        e.preventDefault()
        let file = e.target.files[0]
        setPhoto(file)
        let reader = new FileReader()
        reader.onload = (e)=>{
            let value = e.target.result
            setProfilePhoto(value)
        }
        reader.readAsDataURL(file)
    },[])


    let deletePhoto = (e) => {
        setProfilePhoto("")
    }

    useEffect(async() => {
            setIsLoading(true)
            let res = await dispatch(getUser(user))
            if (!res.bool) {
                console.log(res)
                if(!res.status){
                    setIsLoading(false)
                    setIsError(res.message)
                }else{
                    if(res.status === "admin"){
                        navigate("/adminlogin")
                    }else if(res.status === "user"){
                        navigate("/login")
                    }
                }
               
            } else {
                setIsLoading(false)
                setCountry(res.message.country)
                setState(res.message.state)
                setUsername(res.message.username)
            }
    
        },[user,getUser,navigate,dispatch])

    let tryAgain = useCallback(() => {

    }, [])

    if (isError) {
        return <ErrorModal close={closeModal} error='an error occureed' />
    }
    if (isLoading) {
        return <LoadingModal text='submitting form' />

    }
    if (isSucessful) {
        return <InfoModal close={closeModal} text='submitting form' text={isSucessful} />
    }


    return (
        <>
            <Formheader className={styles.togglemenu} title='Login' />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>

                <div className={styles.right} >

                    <Space className={styles.space} />


                    <form onSubmit={submitHandler} className={styles.form}>
                        <div className={styles.dashboardname}>
                            <h2>Edit Profile</h2>
                        </div>

                        <div className={styles.profile_section}>
                            {profilePhoto ? <img src={profilePhoto} alt='product image' className={styles.circularPic} /> : ""}

                            {!profilePhoto ? <img src={`../../smile.png`} alt='product image' className={styles.circularPic} /> : ""}
                            <div className={styles.buttonContainer}>
                                <div className={styles.deletePhoto}>
                                    <input placeholder="pick photo" type="file"  onChange={changePhoto} />
                                </div>
                                <div className={styles.editPhoto} onClick={deletePhoto}>
                                    <p>delete photo</p>
                                </div>
                            </div>
                        </div>

                        <FormInput
                            icon='edit'
                            label='username'
                            type='text'
                            className={styles.input}
                            formName="username"
                            setFormDetails={setFormDetails}
                            value={username}
                        />
                        <SelectInput
                            icon='menu'
                            label='Country'
                            option_1='Nigeria'
                            option_2='Ghana'
                            option_3='Uganda'
                            option_4='Kenya'
                            option_5='South Africa'
                            option_6='Cotounu republic'
                            formName="country"
                            setFormDetails={setFormDetails}
                            value="country"
                        />

                        <SelectInput
                            icon='menu'
                            label='state'
                            option_1='Nigeria'
                            option_2='Ghana'
                            option_3='Uganda'
                            option_4='Kenya'
                            option_5='South Africa'
                            option_6='Cotounu republic'
                            formName="state"
                            setFormDetails={setFormDetails}
                            value="state"
                        />


                        <Submit action="Update Info" />
                    </form >
                </div>
            </div>

        </>

    )
}

export default EditProfile 