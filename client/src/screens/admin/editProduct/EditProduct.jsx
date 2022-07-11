import React, { useState, useCallback, useEffect } from 'react'
import styles from './editProduct.module.css'
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
import { editProduct, getProduct } from "../../../store/action/userAppStorage";

import { useDispatch } from "react-redux";
import SelectInput from "../../../elements/input-card/select"
//importing from react-router
import { useNavigate, useParams } from "react-router-dom"


let EditProduct = () => {
    const { id } = useParams()
    //
    let [productId, setProductId] = useState("")
    let [productPhoto, setProductPhoto] = useState("")
    let [productCategory, setProductCategory] = useState("")
    let [productSubCategory, setProductSubCategory] = useState("")
    let [productAmount, setProductAmount] = useState("")
    let [ProductName, setProductName] = useState("")
    let [negotiable, setNegotiable] = useState("")
    let [aboutProduct, setAboutProduct] = useState("")
    //loaders state
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [isSucessful, setIsSucessful] = useState(false)

    //initialising redux
    let dispatch = useDispatch()
    //initialising router
    let navigate = useNavigate()


    useEffect(async () => {
        //before anything loader
        setIsLoading(true)
        let res = await dispatch(getProduct(id))
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
            //navigate to product page
            const { _id: id,
                category,
                subCategory,
                amount,
                NameOfProduct,
                negotaible, about } = res.message

            setProductId(id)
            setProductCategory(category)
            setProductSubCategory(subCategory)
            setProductAmount(amount)
            setProductName(NameOfProduct)
            setNegotiable(negotaible)
            setAboutProduct(about)
        }
    }, [dispatch, getProduct])

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
        if (productPhoto && productAmount && ProductName && negotiable && aboutProduct) {
            //submitt form 
            setIsLoading(true)
            let res = await dispatch(editProduct({
                id: productId,
                productPhoto,
                productCategory,
                productSubCategory,
                productAmount,
                ProductName,
                negotiable,
                aboutProduct
            }))
            if (!res.bool) {
                console.log(res)
                setIsLoading(false)
                setIsError(res.message)

            } else {
                setIsLoading(false)
                setIsSucessful("sucessfully submitted")
                //navigate to product page
                setTimeout(() => {
                    navigate("/adminproducts")
                }, 2000)
            }
        }
    }, [productId,
        productPhoto,
        productCategory,
        productSubCategory,
        productAmount,
        ProductName,
        negotiable,
        aboutProduct, dispatch, editProduct])

    let closeModal = useCallback((e) => {
        navigate("/adminproducts")

    }, [])



    if (isError) {
        return <ErrorModal close={closeModal} error='an error occureed' />
    }
    if (isLoading) {
        return <LoadingModal text='please wait' />

    }
    if (isSucessful) {
        return <InfoModal close={closeModal} text='done' text={isSucessful} />
    }


    return (
        <>
            <Formheader className={styles.togglemenu} title='Login' />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>

                <div className={styles.right} >
                    <div style={{ height: '70px' }}>
                        <p>.</p>

                    </div>

                    <Space className={styles.space} />


                    <form onSubmit={submitHandler} className={styles.form}>


                        <FormInput
                            icon='edit'
                            label='photos of product'
                            type='file'
                            className={styles.input}
                            formName="productPhoto"
                            setFormDetails={setFormDetails}

                        />
                        <SelectInput
                            icon='menu'
                            label='category'
                            option_1='stone coated roof'
                            option_2='aluminium roofing sheets'
                            option_3='water collector'
                            option_4='furnitures'
                            formName="productCategory"
                            setFormDetails={setFormDetails}
                            value={productCategory}
                        />
                        <SelectInput
                            icon='menu'
                            label='sub category'
                            option_1='stone coated roof'
                            option_2='aluminium roofing sheets'
                            option_3='water collector'
                            option_4='furnitures'
                            formName="productSubCategory"
                            setFormDetails={setFormDetails}
                            value={productSubCategory}
                        />
                        <SelectInput
                            icon='menu'
                            label='negotiable'
                            option_1='true'
                            option_2='false'
                            formName="productNegotiable"
                            setFormDetails={setFormDetails}
                            value={negotiable}
                        />
                        <FormInput
                            icon='edit'
                            label='name of product'
                            type='text'
                            className={styles.input}
                            formName="productName"
                            setFormDetails={setFormDetails}
                            value={ProductName}
                        />
                        <FormInput
                            icon='amount'
                            label='amount'
                            type='number'
                            className={styles.input}
                            formName="productAmount"
                            setFormDetails={setFormDetails}
                            value={productAmount}
                        />
                        <FormInput
                            icon='edit'
                            label='about product'
                            type='text'
                            className={styles.input}
                            formName="aboutProduct"
                            setFormDetails={setFormDetails}
                            value={aboutProduct}
                        />
                        <Submit action="Add Product" />
                    </form >


                </div>





            </div>

        </>

    )
}

export default EditProduct