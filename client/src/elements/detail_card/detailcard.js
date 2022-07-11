import React,{useEffect} from "react"
import styles from './detailcard.module.css'

import Space from "../../basic_components/space/space"
import ViewAll from "../../basic_components/viewall/viewall"
import SmallHeader from "../../basic_components/small_heading/smallheader"
import Card from "../card/card"


let DetailCard = (props) => {
    
    return <div className={` ${props.className}`} >
        <SmallHeader text='Details of Products' className={styles.cardsection_header} />
        <Space />

        <Card className={styles.card_tablecontainer}>
            <table>


                <tr>
                    <td>Amount</td>
                    <td>$500,000</td>
                </tr>
                <tr>
                    <td>Negotiable</td>
                    <td>yes</td>
                </tr>
                <tr>
                    <td>Store Address</td>
                    <td>165 old warri road opp Rex complex</td>
                </tr>
                <tr>
                    <td>Duration</td>
                    <td>monthly</td>
                </tr>


            </table>



        </Card>

        <ViewAll />


    </div>

}

export default DetailCard
