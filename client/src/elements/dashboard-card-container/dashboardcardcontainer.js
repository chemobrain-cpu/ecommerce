import React from 'react'
import styles from './dashboardcardcontainer.module.css'
import DashboardCard from "../dashboard-card/dashboardCard"
import {useSelector } from "react-redux";

let DashboardCardContainer = () => {
    let { amounSpent} = useSelector(state => state.userAuth)

    return (<div className={styles.dashboardCardContainer}>
        <DashboardCard title="amount spent" amount={amounSpent} percentage="55%" color="#7DF9FF" />
        <DashboardCard title="amount saved" amount={amounSpent} percentage="55%" />
        <DashboardCard color="#D4af37" title="credit" amount={amounSpent} percentage="55%" />
    </div>
    )



}

export default DashboardCardContainer