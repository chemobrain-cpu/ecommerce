import React, {  useState } from "react"
import styles from './sidebar.module.css'
import BarItem from '../../basic_components/bar-item/baritem'
import CircularImage from "../../basic_components/round-image/roundImage"
import { useNavigate, NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { getProductsCategory } from "../../store/action/userAppStorage";

const SideBar = (props) => {
    let [stoneCoated, setStoneCoated] = useState(false)
    let [waterCollector, setWaterCollector] = useState(false)
    let [alumiumRoofing, setAluminiumRoofing] = useState(false)
    let [furniture, setFurniture] = useState(false)

    //initialising redux
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { cart, user, notifications } = useSelector(state => state.userAuth)

    //sorting the notifications for unread notifications

    let unread = notifications.filter(data=>{
        if(data.status === "unread"){
            return data
        }
    })


    let displayStoneCoated = () => {
        setStoneCoated(prev => !prev)
    }
    let displayWaterCollector = () => {
        setWaterCollector(prev => !prev)
    }
    let displayAluminiumRoofing = () => {
        setAluminiumRoofing(prev => !prev)
    }
    let displayFurniture = () => {
        setFurniture(prev => !prev)
    }
    let navigateToCategory = async (e) => {
        let category = e.target.innerHTML
        let res = await dispatch(getProductsCategory(category))
        //if asynchronous function was effective
        //then go to the productcategory screen
        if (res.bool) {
            //navigate(`/products`)
            navigate(`/products/${category}`)
        } else if (!res.bool) {
            navigate(`/products`)
        }
    }

    return (<div className={`${styles.sideBar} ${props.className}`} >

        <div className={styles.userprofile}>
            <h2>OBIS</h2>
            {user && user.admin ? <CircularImage imageUrl={`/${user.photo}`} className={styles.image} /> : ""}
            {user && !user.admin ? <CircularImage imageUrl={`/${user.photo}`} className={styles.image} /> : ""}
            {!user ? <CircularImage imageUrl="../../smile.png" className={styles.image} /> : ""}

            {user && <h2 className={styles.h2}>{user.username}</h2>}

            {user && !user.admin ? <NavLink to={`/editProfile`} ><div className={styles.editprofile}>
                <button>Edit Profile</button>

            </div></NavLink> : ""}
            {user && user.admin ? <NavLink to={`/editAdminProfile`} ><div className={styles.editprofile}>
                <button>Edit Profile</button>
            </div></NavLink> : ""}

            {!user ? <NavLink to="/login">
                <div className={styles.editprofile}>
                    <button>Sign In</button>
                </div>
            </NavLink> : ""}
        </div>

        {/* toggling between buy and rent  */}
        <div className={styles.bottom}>
            <NavLink to='/'><BarItem icon='shopping_cart' name='Home' className={styles.active}  /></NavLink>

            <NavLink to='/notification'><BarItem icon='notifications' name='Notification' className={styles.active} number={unread.length} /></NavLink>

            {user && user.admin ?"":<NavLink to='/cart'><BarItem icon='shopping_cart' name='Cart' className={styles.active} number={cart.no} /></NavLink>}

            <NavLink to='/products'><BarItem icon='inventory' name='Products' className={styles.active}  /></NavLink>

            <BarItem icon='construction' name='Stone Coated Roofs' onClick={displayStoneCoated} />

            {stoneCoated ? <div className={styles.smallMenuCon}>
                <p className={`${styles.smallMenu} ${styles.actives}`} onClick={navigateToCategory}>Shingles green and black</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Shingles black charcoal</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Shingles brown and black</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>classic black</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Melano black</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Shingles black and white</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>classic brown</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Shingles black and red</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Bond green</p>

            </div> : ""}

            <BarItem icon='construction' name='Aluminium Roofing Sheets' onClick={displayAluminiumRoofing} />
            {alumiumRoofing ? <div className={styles.smallMenuCon}>

                <p className={`${styles.smallMenu} ${styles.actives}`} onClick={navigateToCategory}>Classic</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Bond</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Tudor</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Roma</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Long span</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Menticopo</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Steptiles</p>

            </div> : ""}

            <BarItem icon='construction' name='Water Collector' onClick={displayWaterCollector} />
            {waterCollector ? <div className={styles.smallMenuCon}>
                <p className={`${styles.smallMenu} ${styles.actives}`} onClick={navigateToCategory}>Red design</p>
                <p className={styles.smallMenu} onClick={navigateToCategory}></p>
                <p className={styles.smallMenu} onClick={navigateToCategory}>White design</p>
                <p className={styles.smallMenu} onClick={navigateToCategory}>Bond green</p>
            </div> : ""}

            <BarItem icon='construction' name='Furnitures' onClick={displayFurniture} />

            {furniture ? <div className={styles.smallMenuCon}>
                <p className={`${styles.smallMenu} ${styles.actives}`} onClick={navigateToCategory}>Tables</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Chairs</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Kitchen cabinets</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>Wardrobe</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>beds</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>doors</p>

                <p className={styles.smallMenu} onClick={navigateToCategory}>office chairs</p>

            </div> : ""}

            {user && user.admin ? <NavLink to='/admindashboard'><BarItem icon='analytics' name='dashboard' className={styles.active} /></NavLink> : ""}
            {user && user.admin ? <NavLink to='/addproduct'><BarItem icon='add' name='Add product' className={styles.active} /></NavLink> : ""}
            {user && !user.admin ? <NavLink to='/dashboard'><BarItem icon='analytics' name='order' className={styles.active} /></NavLink> : ""}

            {user ? <NavLink to='/login'><BarItem icon='logout' name='logout' /></NavLink> : <NavLink to='/login'><BarItem icon='logout' name='login' /></NavLink>}

        </div>

    </div>)




}
export default SideBar