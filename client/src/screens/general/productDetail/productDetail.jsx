import React, { useState, useCallback, useEffect } from 'react'
import styles from './productDetail.module.css'
import Formheader from "../../../elements/main-header/formhead"
import SideBar from "../../../elements/dashboard-sidebar/sidebar"
import ImageCard from "../../../elements/image-card/imageCard"
import Container from "../../../elements/horizontal_cards/card_container"
//importing modals
import LoadingModal from "../../../elements/Modal/LoadingModal"
import Comment from "../../../elements/commentContainer/comment"
import ErrorModal from "../../../elements/Modal/ErrorModal"
//importing redux fun
import { useNavigate, useParams, NavLink } from "react-router-dom"
import { addCart, getProduct } from "../../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";

let Products = () => {
    let [product, setProduct] = useState({})
    let [comments, setComments] = useState([])
    //loaders state
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [isSucessful, setIsSucessful] = useState(false)
    //initialising redux
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { id } = useParams()
    let { user } = useSelector(state => state.userAuth)

    useEffect(async () => {
        //before anything loader
        setIsLoading(true)
        let res = await dispatch(getProduct(id))
        if (!res.bool) {
            if (!res.status) {
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
            setProduct(res.message)
            let comment = res.message.comment
            if (comment.length > 0) {
                let firstComment = [comment[0]]
                setComments(firstComment)
            }

        }
    }, [dispatch, getProduct, navigate])

    let closeModal = useCallback((e) => {
        setIsLoading(false)
        setIsError(false)
        setIsSucessful(false)
    }, [])

    let tryAgain = useCallback(() => {
    }, [])

    let addToCart = useCallback(async (data) => {
        setIsLoading(true)
        if (!user) {
            return navigate("/login")
        }
        try {
            let res = await dispatch(addCart(data))
            if (!res.bool) {
                console.log(res)
                setIsLoading(false)
                setIsError(res.message)
            } else {
                setIsLoading(false)
            }
        } catch (err) {
        }

    }, [addCart, user, dispatch, addCart])


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
                    <div className={styles.dashboardname}>
                        <h2>product details</h2>

                    </div>
                    <div className={styles.rightsection}>
                        <Container>
                            <ImageCard

                                imageUrl={`\\${product.photos}`}
                                view="front-view"

                            />
                            <ImageCard

                                imageUrl={`\\${product.photos}`}
                                view="front-view"

                            />
                            <ImageCard

                                imageUrl={`\\${product.photos}`}
                                view="front-view"

                            />
                            <ImageCard
                                imageUrl={`\\${product.photos}`}
                                view="front-view"
                            />

                        </Container>
                    </div>

                    <div className={styles.leftsection}>
                        <div className={styles.about}>

                            <div className={styles.aboutContent}>
                                <div><h3>About</h3></div>
                                <div><h3>{product.about}</h3></div>
                            </div>

                            <div className={styles.aboutContent}>
                                <div><h3>category</h3></div>
                                <div><h3>{product.category}</h3></div>
                            </div>


                            <div className={styles.aboutContent}>
                                <div><h3>Amount</h3></div>
                                <div><h3>${product.amount}</h3></div>
                            </div>
                            <div className={styles.aboutContent}>
                                <div onClick={() => addToCart(product._id)}><h3 className="material-icons" style={{fontSize:"2rem"}}>shopping_cart</h3></div>

                                <div >
                                    <NavLink to={`/comment/${product._id}`} ><h3 >comments</h3></NavLink>


                                </div>



                            </div>
                        </div>
                        <Comment comments={comments}
                            className={styles.comment}
                            commentPage={false}
                        />

                    </div>
                </div>

            </div>


        </>
    )





}

export default Products