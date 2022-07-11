import React, { useState, useCallback } from 'react'
import styles from './addProduct.module.css'
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
import { addProduct } from "../../../store/action/userAppStorage";
import { useDispatch } from "react-redux";
import SelectInput from "../../../elements/input-card/select"
//importing from react-router
import { useNavigate } from "react-router-dom"


let AddProduct = () => {
    let [productPhoto, setProductPhoto] = useState("")
    let [productCategory, setProductCategory] = useState("")
    let [productSubCategory, setProductSubCategory] = useState("")
    let [productAmount, setProductAmount] = useState("")
    let [ProductName, setProductName] = useState("")
    let [negotiable, setNegotiable] = useState("")
    let [aboutProduct, setAboutProduct] = useState("")
    //loaders state
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isSucessful, setIsSucessful] = useState(false)

    //initialising redux
    let dispatch = useDispatch()
    //initialising router
    let navigate = useNavigate()

    let setFormDetails = useCallback(e => {
        if (e.formName === "productPhoto") {
            let formValue = e.value
            setProductPhoto(formValue)

        } else if (e.formName === "productCategory") {
            let formValue = e.value
            setProductCategory(formValue)

        } else if (e.formName === "productSubCategory") {
            let formValue = e.value
            setProductSubCategory(formValue)

        } else if (e.formName === "productNegotiable") {
            let formValue = e.value
            setNegotiable(formValue)

        } else if (e.formName === "productName") {
            let formValue = e.value
            setProductName(formValue)

        } else if (e.formName === "productAmount") {
            let formValue = e.value
            setProductAmount(formValue)

        } else if (e.formName === "aboutProduct") {
            let formValue = e.value
            setAboutProduct(formValue)

        }
    }, [])

    let submitHandler = useCallback(async (e) => {
        e.preventDefault()
        if (productPhoto && productAmount && ProductName  && aboutProduct) {
            //submitt form 
            setIsLoading(true)
            let res = await dispatch(addProduct({
                productPhoto,
                productCategory,
                productSubCategory,
                productAmount,
                ProductName,
                negotiable,
                aboutProduct
            }))
            if (!res.bool) {
                if (!res.status) {
                    console.log(res.message)
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
                setIsSucessful("product added")
                //navigate to product page
                setTimeout(() => {
                    navigate("/adminproducts")
                }, 2000)
            }
        }
    },[productPhoto , productCategory , productSubCategory , productAmount, ProductName, aboutProduct,dispatch,navigate])

    let closeModal = useCallback((e) => {
        navigate("/adminproducts")
    }, [navigate])

    let tryAgain = useCallback(() => {

    }, [])


    if (isError) {
        return <ErrorModal close={closeModal} error='could not save' />
    }
    if (isLoading) {
        return <LoadingModal text='please wait' />
    }
    if (isSucessful) {
        return <InfoModal close={closeModal} text='please wait' text={isSucessful} />
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
                    <div style={{height:'600px'}}>
                       <p>.</p>

                    </div>


                    <form onSubmit={submitHandler} className={styles.form}>

                        <FormInput
                            icon='edit'
                            label='photos of product'
                            type='file'
                            className={styles.input}
                            formName="productPhoto"
                            setFormDetails={setFormDetails}
                        />
                        <FormInput
                            icon='edit'
                            label='about the product'
                            type='text'
                            className={styles.input}
                            formName="aboutProduct"
                            setFormDetails={setFormDetails}
                        />
                        <SelectInput
                            icon='menu'
                            label='category'
                            option_1='saluminium roofing sheet'
                            option_2='stone coated roof'
                            option_3='water collector'
                            option_4='furnitures'
                            formName="productCategory"
                            setFormDetails={setFormDetails}
                        />
                        <SelectInput
                            icon='menu'
                            label='sub category'
                            option_1 = 'Shingles green and black'
                            option_2 = 'Shingles black charcoal'
                            option_3 ='Shingles brown and black'
                            option_4 = 'classic black
                            Melano black'
                            option_5 ='Shingles black and white'
                            option_6 ='classic brown'
                            option_7 ='Shingles black and red'
                            option_8 ='Bond green'
                            option_9 ='Classic'
                            option_10 ='Bond'
                            option_11 ='Tudor'
                            option_12 ='Roma'
                            option_13 ='Long'
                            option_15 ='Menticopo'
                            option_16 ='Steptiles'
                            option_17 ='Red design'
                            option_18 ='White design'
                            option_19 ='Bond green'
                            option_20 ='Tables'
                            option_21 ='Chairs'
                            option_22 ='Kitchen cabinets
                            Wardrobe'
                            option_23 ='beds
                            doors'
                            option_24 ='office chairs'
                            formName="productSubCategory"
                            setFormDetails={setFormDetails}
                        />
                        <SelectInput
                            icon='menu'
                            label='negotiable'
                            option_1='true'
                            option_2='false'
                            formName="productNegotiable"
                            setFormDetails={setFormDetails}
                        />
                        <FormInput
                            icon='edit'
                            label='name of product'
                            type='text'
                            className={styles.input}
                            formName="productName"
                            setFormDetails={setFormDetails}
                        />
                        <FormInput
                            icon='amount'
                            label='amount'
                            type='number'
                            className={styles.input}
                            formName="productAmount"
                            setFormDetails={setFormDetails}
                        />
                        <Submit action="Add Product" />
                    </form >


                </div>





            </div>

        </>

    )
}

export default AddProduct