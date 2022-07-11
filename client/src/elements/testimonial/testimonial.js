import React, { useState,useCallback,useEffect} from 'react'
import styles from './testimonial.module.css'
import Aos from "aos"
import 'aos/dist/aos.css'

let Testimonial = () => {
    useEffect(() => {
        Aos.init({ duration: 1500, offset: 20 }, [])
    })
    let [count, setCount] = useState(0)
    let arr = [{
        username: "Cynthia charles",
        photo: `../../precious.jpg`,
        text: "They are unique. Products cheap and affordable"
    },
    {
        username: "Mark David",
        photo: `../../smile.png`,
        text: "Durable and last longer.Delivery system is ontime and effficient"
    },
    {
        username: "presh Devops",
        photo: `../../obaschair.jpg`,
        text: "I must confess their products are durable and long lasting. Do well to patroniZe them"
    },
    ]

    let changeCount = useCallback( pointer => {
        let increment
        if (pointer === "right") {
            if (count === 2) {
                increment = 0
            } else {
                increment = count + 1

            }

            setCount(increment)
        } else if (pointer === "left") {
            if (count === 0) {
                increment = 2
            } else {
                increment = count - 1

            }

            setCount(increment)
        }


    },[count])



    return (<div className={styles.testimonialContainer} data-aos='fade-down'>
        <h2>" What People Are Saying</h2>
        <div className={styles.testimonial}>
            <div className={styles.imageContainer}>
                <img src={arr[count].photo} className={styles.testimonialImage} />

            </div>

            <h2>{arr[count].username}</h2>

            <p>{arr[count].text}</p>
            
        </div>

        <div className={styles.buttonContainer}>
            {count === 0 ? <button style={{backgroundColor:"white"}}>

            </button> : <button style={{backgroundColor:"grey"}}>

            </button>}

            {count === 1 ? <button style={{backgroundColor:"white"}}>

            </button> : <button style={{backgroundColor:"grey"}}>

            </button>}
            {count === 2 ? <button style={{backgroundColor:"white"}}>

            </button> : <button style={{backgroundColor:"grey"}}>

            </button>}

        </div>

        <div className={styles.leftbutton} onClick={() => changeCount("left")}>
            <p className="material-icons">arrow_back_ios</p>

        </div>
        <div className={styles.rightbutton} onClick={() => changeCount("right")}>
            <p className="material-icons">arrow_forward_ios</p>

        </div>


    </div>)
}

export default React.memo(Testimonial)