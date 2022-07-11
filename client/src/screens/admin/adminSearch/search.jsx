import React, { useState, useCallback, useEffect } from 'react'
import styles from './search.module.css'
import Formheader from "../../../elements/main-header/adminheader"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import PropertyCard from "../../../elements/property-card/propertyCard"
import Container from "../../../elements/horizontal_cards/card_container"
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import ErrorModal from "../../../elements/Modal/ErrorModal"
import EmptyModal from "../../../elements/Modal/EmptyModal"

//importing redux fun
import { delProduct } from "../../../store/action/userAppStorage";
//importing from react-router
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

let AdminSearchResult = () => {
    let [products, setProducts] = useState([])
    //loaders state
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isSucessful, setIsSucessful] = useState(false)

    //initialising redux
    let dispatch = useDispatch()
    //initialising router
    let navigate = useNavigate()


    let { user, searchedProducts } = useSelector(state => state.userAuth)

    useEffect(async () => {
        //before anything loader
        setProducts(searchedProducts)
    }, [])

    let closeModal = useCallback((e) => {
        navigate("/adminproducts")

    }, [])

    let deleteProduct = useCallback(async (id) => {
        //before anything loader
        if (!user) {
            return navigate(`/login`)
        } else if (!user && !user.isAdmin) {
            return navigate(`/login`)
        }
        setIsLoading(true)
        let res = await dispatch(delProduct(id))
        if (!res.bool) {
            if (!res.status) {
                console.log(res.message)
                setIsLoading(false)
                setIsError(res.message)
            } else {
                setIsLoading(false)
                if (res.status === "admin") {
                    navigate("/adminlogin")
                } else if (res.status === "user") {
                    navigate("/login")
                }
            }
        } else {
            setIsLoading(false)
            setProducts(res.message)
        }



    }, [delProduct, user, navigate,dispatch])

    let editProduct = useCallback(async (id) => {
        //before anything loader
        if (!user) {
            return navigate(`/login`)
        } else if (!user && !user.isAdmin) {
            return navigate(`/login`)
        }
        setIsLoading(true)
        setTimeout(() => {
            navigate(`/editproduct/${id}`)
        }, 3000)
    }, [user])


    

    if (isError) {
        return <ErrorModal close={closeModal} error='an error occureed' />
    }
    if (isLoading) {
        return <LoadingModal text='please wait' />
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
                                edit={true}
                                amount={Number(data.amount)}
                                imageUrl={`http:\\\\localhost:8080\\${data.photos}`}
                                deleteProduct={deleteProduct}
                                editProduct={editProduct}
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
                                imageUrl={`http:\\\\localhost:8080\\${data.photos}`}
                                deleteProduct={deleteProduct}
                                editProduct={editProduct}
                            />)}
                        </Container>


                    </div>




                </div>





            </div>

        </>
    )
}
export default AdminSearchResult 