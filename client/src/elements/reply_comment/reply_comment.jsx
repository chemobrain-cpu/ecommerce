import React,{useEffect} from "react"
import styles from './reply_comment.module.css'
import CircularImage from "../../basic_components/round-image/roundImage"
import Username from "../../basic_components/username/username"
import Text from "../../basic_components/text/text"
import Aos from "aos"
import 'aos/dist/aos.css'


const ReplyComment = (props) => {
    return (<div className={`${styles.commentreplycontainer} ${props.className}`}>
        <div className={styles.commentreply}>
            <div className={styles.left}>

                <CircularImage imageUrl="../../precious.jpg" />
            </div>
            <div className={styles.right}>
                <Username text='Micheal' className={styles.username}/>
                <div className={styles.comment}>
                    <Text className={styles.reply_p}>
                        for now the price is not negotiable because most of the product was bult by foriegners

                    </Text>


                </div>

            </div>


        </div>

        {/*comment link goes here*/}
        <div className={styles.link}>
            <span className="material-icons">delete</span>
            <span >05|05|29</span>
        </div>
        
    </div>)

}

export default React.memo(ReplyComment)