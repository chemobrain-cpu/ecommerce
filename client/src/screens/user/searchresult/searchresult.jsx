import React, { useState, useCallback, useEffect } from 'react'
import styles from './searchresult.module.css'
import Formheader from "../../../elements/main-header/formhead"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import PropertyCard from "../../../elements/property-card/propertyCard"
import Container from "../../../elements/horizontal_cards/card_container"
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import ErrorModal from "../../../elements/Modal/ErrorModal"
//importing redux fun
import { useNavigate } from "react-router-dom"
import { addCart, delProduct } from "../../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";
import EmptyModal from "../../../elements/Modal/EmptyModal"

let Search = () => {
    let [products, setProducts] = useState([])
    //loaders state
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    //initialising redux
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { token, searchedProducts,user } = useSelector(state => state.userAuth)

    useEffect(async () => {
        //before anything loader
        setProducts(searchedProducts)
        setIsError(false)
    }, [searchedProducts])

    let closeModal = useCallback((e) => {
        navigate("/login")
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
        return <ErrorModal close={closeModal} error='an error occureed' />
    }
    if (isLoading) {
        return <LoadingModal text='loading products for you' />
    }
    if (products.length === 0) {
        return <>
            <Formheader className={styles.togglemenu} title='Login' />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>
                <div className={styles.right} >
                    <EmptyModal emptyText="search not found" />
                </div>
            </div>

        </>
    }

    let addToCart = async (id) => {
        setIsLoading(true)
        if (!token) {
            return navigate("/login")
        }
        try {
            let res = await dispatch(addCart(id))
            if (!res.bool) {
                console.log(res)
                setIsLoading(false)
                setIsError(res.message)
            } else {
                setIsLoading(false)
            }
        } catch (err) {

        }

    }


    return (
        <>
            <Formheader className={styles.togglemenu} title='Login' />
            <div className={styles.screen} >
                <div className={styles.left}>
                    <SideBar />
                </div>

                <div className={styles.right} >
                    <div className={styles.dashboardname}>
                        <h2>{products[0].NameOfProduct}</h2>

                    </div>
                    <div className={styles.rightsection}>
                        <Container>
                            {products.map((data) => <PropertyCard
                                key={data._id}
                                id={data._id}
                                amount={Number(data.amount)}
                                imageUrl={`\\${data.photos}`}
                                addToCart={addToCart}
                                deleteProduct = {deleteProduct}
                                editProduct = {editProduct}
                            />)}
                        </Container>



                    </div>
                    <div className={styles.leftsection}>

                        <Container>
                            {products.reverse().map((data) => <PropertyCard
                                key={data._id}
                                amount={Number(data.amount)}
                                imageUrl={`\\${data.photos}`}
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

export default Search