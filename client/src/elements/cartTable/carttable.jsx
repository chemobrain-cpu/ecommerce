import React, { useCallback } from "react"
import styles from "./carttable.module.css"
//importing redux fun
import { useSelector } from "react-redux";

const CartTable = () => {
    //loaders state

    //initialising redux
    let { cart } = useSelector(state => state.userAuth)



    return (<>
    
    <table className={styles.tablecon}>
        
        <tbody>
            <tr>
                <td>sub-total</td>
                <td>{cart.totalAmount}</td>

            </tr>
            <tr>
                <td>shipping</td>
                <td>free</td>
            </tr>

        </tbody>

    </table>
    </>)
}


export default React.memo(CartTable)