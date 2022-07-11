import React from 'react'
import styles from './formhead.module.css'
import SideBar from "../dashboard-sidebar/sidebar"
import SearchContainer from "../searchcontainer/searchcontainer";
//importing redux fun
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

let Backheader = (props) => {
    //initialising redux
    let navigate = useNavigate()
    let { cart } = useSelector(state => state.userAuth)


    return <div className={`${props.className} ${styles.headerContainer}`}>
        <div className={styles.left}>
            <h2>OB<span>I</span></h2>
            <SearchContainer className={styles.searchContainer} />
        </div>


        <div className={styles.right}>
            <input type='checkbox' id='mobilemenu' className={styles.mobilemenu} />


            <label htmlFor="mobilemenu" className=" material-icons" >

                menu

            </label>
            <div className={styles.cartContainer}>
                <span className=" material-icons cart" >
                    shopping_cart
                </span>
                <div className={styles.cartNumber}>
                    <h3>{cart.no}</h3>

                </div>


            </div>


            <SideBar className={styles.sidebar} />


        </div>



    </div>


}


export default React.memo(Backheader)