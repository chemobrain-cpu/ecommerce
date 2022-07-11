import React from 'react'
import styles from './formhead.module.css'
import SideBar from "../dashboard-sidebar/sidebar"
import SearchContainer from "../searchcontainer/searchcontainer"

let Backheader = (props) => {

    return <div className={`${props.className} ${styles.headerContainer}`}>
        <div className={styles.left}>

        <h2></h2>
            <SearchContainer className={styles.searchContainer}/>
        </div>

        
        <div className={styles.right}>
            <input type='checkbox' id='mobilemenu' className={styles.mobilemenu} />


            <label htmlFor="mobilemenu" className=" material-icons topleft" >

                menu

            </label>

            
            <SideBar className={styles.sidebar} />


        </div>



    </div>


}


export default React.memo(Backheader)