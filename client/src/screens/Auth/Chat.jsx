import React, { useState, useCallback, useEffect } from 'react'
import styles from './chat.module.css'
import Formheader from "../../elements/main-header/chatHeader"
//importing redux fun
import SideBar from "../../elements/dashboard-sidebar/sidebar"
import { useNavigate } from "react-router-dom"
import { addCart } from "../../store/action/userAppStorage";
import { useDispatch, useSelector } from "react-redux";
import SendMessage from '../../basic_components/sendMessage/sendMessage'

let Chat = () => {
    let [products, setProducts] = useState([])
    //loaders state
    let [isLoading, setIsLoading] = useState(false)
    let [isError, setIsError] = useState(false)
    let [isSucessful, setIsSucessful] = useState(false)
    //initialising redux
    let dispatch = useDispatch()

    let navigate = useNavigate()
    let { token, cart } = useSelector(state => state.userAuth)

    
    useEffect(async () => {
        //before anything loader

    }, [])


    try {
        if (isError) {

        }




        return (
            <>
                <Formheader className={styles.togglemenu} title='Login' />

                <div className={styles.screen} >
                    <div className={styles.left}>
                        <SideBar />
                    </div>

                    <div className={styles.right} >

                        <div className={styles.chatscreen}>
                            <div className={styles.chatContainer}>
                                <div className={styles.myChat}>
                                    <div className={styles.message}>
                                        <p>hello,howre are you.i need the product</p>

                                    </div>
                                    <div className={styles.time}>
                                        <p>5:16</p>

                                    </div>


                                </div>
                                <div className={styles.chat}>
                                    <div className={styles.message}>
                                        <p>ok</p>

                                    </div>
                                    <div className={styles.time}>
                                        <p>5:16</p>

                                    </div>

                                </div>

                                <div className={styles.myChat}>
                                    <div className={styles.message}>
                                        <p>so when can i get the product</p>

                                    </div>
                                    <div className={styles.time}>
                                        <p>5:16</p>

                                    </div>


                                </div>
                                <div className={styles.chat}>
                                    <div className={styles.message}>
                                        <p>next week</p>

                                    </div>
                                    <div className={styles.time}>
                                        <p>5:16</p>

                                    </div>

                                </div>
                                <div className={styles.myChat}>
                                    <div className={styles.message}>
                                        <p>ok i just pray im not scammed</p>

                                    </div>
                                    <div className={styles.time}>
                                        <p>5:16</p>

                                    </div>


                                </div>
                                <div className={styles.chat}>
                                    <div className={styles.message}>
                                        <p>No.you shouldnt think that way...Finder is 100% secure</p>

                                    </div>
                                    <div className={styles.time}>
                                        <p>5:16</p>

                                    </div>


                                </div>
                                <div className={styles.myChat}>
                                    <div className={styles.message}>
                                        <p>ok ok..i trust </p>

                                    </div>
                                    <div className={styles.time}>
                                        <p>5:16</p>

                                    </div>


                                </div>
                              
                            </div>

                        </div>
                        <div className={styles.sendInput}>
                            <SendMessage className={styles.sendMessage} style=
                                {{ width: "100%" }} 
                                placeholder="write your message"/>

                        </div>




                    </div>





                </div>

            </>
        )


    } catch (err) {
        console.log(err)

    }


}

export default Chat