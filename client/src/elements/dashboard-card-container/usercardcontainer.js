import React from 'react'
import styles from './dashboardcardcontainer.module.css'

import UserCard from "../userCard/userCard"


let UserCardContainer = (props) => {
    return (<div className={styles.dashboardCardContainer}>

        {props.users.map(data => <UserCard
        key={data._id} imageUrl={`\\${data.photo}`}
            username={data.username}
            onClick={() => props.navigateHandler(data._id)}
        />)}

    </div>

    )



}

export default UserCardContainer