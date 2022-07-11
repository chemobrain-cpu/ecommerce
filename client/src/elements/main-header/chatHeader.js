import React from 'react'
import styles from './chatHeader.module.css'
import SideBar from "../dashboard-sidebar/sidebar"
//importing redux fun
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import SearchContainer from "../searchcontainer/searchcontainer";


let Backheader = (props) => {
    //initialising redux
    let navigate = useNavigate()
    let { cart } = useSelector(state => state.userAuth)


    return <div className={`${props.className} ${styles.headerContainer}`}>
        <div className={styles.left}>
          
            <img alt='user-photo' src={"../../connect (4).png"} style={{ width: '40px', height: '40px', margin: '0px' }} />
            <h2>fin<span>der</span></h2>
            
        </div>
        


        <div className={styles.right}>
            <div className={styles.userInfo}>
                
                <div>
                <img src={'../../precious.jpg'} className={styles.img} alt='img'/>

                </div>
                <div className={styles.info}>
                    <h3>Presh Devops</h3>
                    <div className={styles.status}>
                        
                    <p>3 minutes ago</p>

                    </div>
                    
                    
                </div>

            </div>
            <input type='checkbox' id='mobilemenu' className={styles.mobilemenu} />


            <label htmlFor="mobilemenu" className=" material-icons" >

                menu

            </label>



            <SideBar className={styles.sidebar} />


        </div>



    </div>


}


export default React.memo(Backheader)