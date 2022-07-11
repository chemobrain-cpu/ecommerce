import React from "react"
import styles from "./cartnav.module.css"
import Container from "../horizontal_cards/card_container"

const CartNav = (props) =>{
    return ( <Container>
        <h2 className={`${styles.state} ${props.current === "cart"?styles.stateactive:""}`}>1.Cart</h2>
        <h2 className={`${styles.state} ${props.current === "details"?styles.stateactive:""}`}>2.Details</h2>
        <h2 className={`${styles.state} ${props.current === "payment"?styles.stateactive:""}`}>3.Payment</h2>

    </Container>)
}


export default React.memo(CartNav)