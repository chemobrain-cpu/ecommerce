import React from 'react'
import styles from './backheader.module.css'
import SideBar from "../dashboard-sidebar/sidebar"

let Backheader = (props) => {

    return <div className={`${props.className} ${styles.headerContainer}`}>
        <div className={styles.left}>

            <label for='mobilemenu' className="checkbox material-icons topleft" style={{ fontSize: '3rem', color: '#574b3e' }} >

                chevron_left

            </label>
            <h2>{props.title}</h2>
        </div>
        <div className={styles.menu}>
            <input type='checkbox' id='mobilemenu' className={styles.mobilemenu} />
            {!props.disable ? <label for='mobilemenu' className="checkbox material-icons topleft" >

                {props.edit ? 'edit' : 'menu'}

            </label> : <label  className="checkbox material-icons topleft" >

                {props.edit ? 'edit' : 'menu'}

            </label>}
            <SideBar className={styles.sidebar} />


        </div>



    </div>


}


export default Backheader