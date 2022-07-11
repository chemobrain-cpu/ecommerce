import React  from 'react'
import styles from './dashboardCard.module.css'


let DashboardCard = (props) => {

    return (
        <div className={styles.insight}>
            <div className={styles.sales}>
                <span className="material-icons">
                    insights
                </span>

                <div className={styles.middle}>
                    <div className={styles.lefts}>
                        <h3>{props.title}</h3>
                        <h1>{props.amount}</h1>
                    </div>
                    <div className={styles.progress}>
                        <svg className={styles.svg}>
                            <circle cx='38' cy='38' r='36' style={{stroke:props.color}}>

                            </circle>
                        </svg>
                        <div className={styles.number}>
                            <p>{props.percentage}</p>
                        </div>
                    </div>
                </div>
                <small className={styles.textMuted}>
                    Last 24 hours
                </small>

            </div>
        </div>
    )



}

export default DashboardCard