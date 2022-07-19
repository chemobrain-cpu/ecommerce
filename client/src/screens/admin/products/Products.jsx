import React, { useState, useCallback, useEffect } from 'react'
import styles from './products.module.css'
import Formheader from "../../../elements/main-header/adminheader"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import PropertyCard from "../../../elements/property-card/propertyCard"
import Container from "../../../elements/horizontal_cards/card_container"
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import ErrorModal from "../../../elements/Modal/ErrorModal"
import EmptyModal from "../../../elements/Modal/EmptyModal"

//importing redux fun
import { delProduct,getProducts } from "../../../store/action/userAppStorage";
//importing from react-router
import {useNavigate} from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";

let Products = () => {
    let [products, setProducts] = useState([])
    //loaders state
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)

    //initialising redux
    let dispatch = useDispatch()
    //initialising router
    let navigate = useNavigate()
    let { user } = useSelector(state => state.userAuth)


    useEffect(async () => {
        //before anything loader
        setIsLoading(true)
        let res = await dispatch(getProducts())
        if (!res.bool) {
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
            //navigate to product page
            setProducts(res.message)
        }
    }, [getProducts,dispatch,navigate])


    let closeModal = useCallback((e) => {
        navigate("/adminproducts")


    }, [navigate])

    let deleteProduct = useCallback( async(id)=>{
         //before anything loader
          //before anything loader
          if(!user){
            return navigate(`/adminlogin`)

         }else if(!user && !user.isAdmin ){
           return  navigate(`/adminlogin`)

         }
        setIsLoading(true)
        let res = await dispatch(delProduct(id))
        if (!res.bool) {
            console.log(res)
            setIsLoading(false)
            setIsError(res.message)
        } else {
            setIsLoading(false)
            setProducts(res.message)
        }
    },[delProduct,dispatch,user,navigate])

    let editProduct = useCallback(async(id)=>{
         //before anything loader
         if(!user){
            return navigate(`/adminlogin`)

         }else if(!user && !user.isAdmin ){
           return  navigate(`/adminlogin`)

         }
        setIsLoading(true)
        setTimeout(()=>{
            navigate(`/editproduct/${id}`)

        },3000)
    },[user,navigate])
   

    if (isError) {
        return <ErrorModal close={closeModal} error={isError} />
    }
    if (isLoading) {
        return <LoadingModal text='please wait' />
    }
    if(products.length === 0){
        return <>
        <Formheader className={styles.togglemenu} title='Login' />
        <div className={styles.screen} >
            <div className={styles.left}>
                <SideBar />
            </div>
            <div className={styles.right} >
                <EmptyModal emptyText="store seems empty"/> 
            </div>
        </div>
    </>
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
                        <Container>
                            {products.map((data) => <PropertyCard
                                key={data._id}
                                id={data._id}
                                edit={true}
                                amount={Number(data.amount)}
                                imageUrl={`https://shielded-plateau-98818.herokuapp.com/${data.photos}`}
                                deleteProduct = {deleteProduct}
                                editProduct = {editProduct}
                            />)}
                        </Container>
                    </div>
                    <div className={styles.leftsection}>

                        <Container>
                        {products.reverse().map((data) => <PropertyCard
                                key={data._id}
                                id={data._id}
                                edit={true}
                                amount={Number(data.amount)}
                                imageUrl={`https://shielded-plateau-98818.herokuapp.com/${data.photos}`}
                                deleteProduct = {deleteProduct}
                                editProduct = {editProduct}
                            />)}
                        </Container>

                    </div>

                </div>

            </div>
        </>

    )
}

export default Products