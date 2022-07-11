import React from 'react'
import styles from './authheader.module.css'

//importing redux fun
import { useNavigate, NavLink } from "react-router-dom"
import { useSelector } from "react-redux";


let Backheader = (props) => {
    //initialising redux
    let navigate = useNavigate()
    let { cart } = useSelector(state => state.userAuth)


    return <div className={`${props.className} ${styles.headerContainer}`}>
        <div className={styles.left}>
            <h2>{props.title}</h2>

        </div>


        <div className={styles.right}>
            <NavLink to={`/${props.link}`}>
                <div className={styles.button}>
                    {props.title === "login"?"signup":"login"}
                </div>
            </NavLink>






        </div>



    </div>


}


export default Backheader