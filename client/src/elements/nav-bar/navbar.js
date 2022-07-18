import React, { useState, useCallback} from 'react'
import styles from './navbar.module.css'

import SearchContainer from "../searchcontainer/searchcontainer";
//importing redux fun
import { useNavigate } from "react-router-dom"
//importing redux fun
import { useSelector } from "react-redux";


let NavBar = () => {
    let [block, setBlock] = useState(false)
    //initialising redux
    let navigate = useNavigate()
    let { cart } = useSelector(state => state.userAuth)

    let focusHandler = useCallback(() => {
        setBlock(prev => !prev)
    },[])

    return (<div className={styles.navigation}>
            <div className={styles.navLeft}>
                <h2>OBIS</h2>
                <div className={styles.navigationLinkContainer}>
                    <p >Homes</p>
                    

                </div>

            </div>
            
            <div className={styles.navRight}>
                <div className={styles.togglemenuContainer}>
                    <input type='checkbox' id='mobilemenu' className={styles.mobilemenu} />
                    <label htmlFor="mobilemenu" >
                        <div className={styles.togglemenu}>

                            <span className=" material-icons" >
                                menu
                            </span>
                        </div>

                    </label>

                    {/*home sidebar */}
                    <div className={styles.sideBar}>
                        <label htmlFor="mobilemenu" className="material-icons">
                            menu
                        </label>
                        <div className={styles.menu}>
                            <p onClick={()=> navigate("/login")}> LOGIN</p>
                            <p onClick={()=> navigate("/signup")}>SIGNUP</p>
                            <p onClick={()=> navigate("/products")}>SHOP</p>

                        </div>
                    </div>

                </div>
                <div className={styles.searchCon}>
                    <SearchContainer/>


                </div>





               
                    

               

                <div className={styles.iconContainer}>

                    
                    <div className={styles.signupContainer}>

                        <div >
                            <h3>Sign In</h3>

                        </div>


                    </div>

                </div>






            </div>

        </div>)
}

export default React.memo(NavBar)