import React,{useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import styles from "./home.module.css"
import Aos from "aos"
import 'aos/dist/aos.css'
//importing redux fun


let Home = () => {
    let navigate = useNavigate()
    let [toggle,setToggle] = useState(false)
    useEffect(() => {
        Aos.init({ duration: 1500, offset: 20 }, [])
    })
    let goToShop = ()=>{
        navigate("/products")

    }
    
    let togglebtn=()=>{
        setToggle(prev=>!prev)
    }
    let search = () =>{
        navigate("/products")

    }

    let register = ()=>{
        navigate("/signup")
    }
    
    return (< ><div className={styles.header}>
    <nav className={`${toggle && styles.hidemenu}`} >
        <div className={styles.logo_image}>
            
            <img src={"../../logo.png"} className={styles.logo}/>
           
        </div>
        

        <ul className={styles.nav_links}>
            <li className={styles.active}>
                <a href="#">all collections</a>

            </li>
           
           
        </ul>

        <a className={styles.register_btn} onClick={register}>Register Now</a>
        <i className="fa fa-bars " onClick={togglebtn}></i>
    </nav>
    <div className={styles.container} data-aos='fade-down'>
        <h1>Find Your Best Furniture</h1>
        <div className={styles.search_bar}>
            <form action="">
                <div className={styles.location_input}>
                    <label>Collection</label>
                    <input type="text" placeholder="chair"></input>

                </div>
                <div>
                    <label>Colors</label>
                    <input type="text" placeholder="Color Type"></input>

                </div>
                <div>
                    <label>Type</label>
                    <input type="text" placeholder="Offices"></input>

                </div>

                
                <button type="submit" onClick={search}><i className="fa fa-search"></i></button>
            </form>
        </div>

    </div>

</div>

<div className={styles.container} >
    <h2 className={styles.sub_title}>Bedroom Furnitures For You</h2>
    <div className={styles.exclusives}>
        
        <div data-aos='fade-down'>
            <img src={"../../chair2.jpg"}></img>
            <span className={styles.span}>
                <h3>Bedroom Furniture</h3>
                <p>320,000</p>
            </span>
        </div>
        
        <div data-aos='fade-down'>
            <img src={"../../chair3.jpg"}></img>
            <span className={styles.span}>
                <h3>Bedroom Furniture</h3>
                <p>320,000</p>
            </span>
        </div>
        
       
        <div data-aos='fade-down'>
            <img src={"../../chair6.jpg"}></img>
            <span className={styles.span}>
                <h3>Bedroom Furniture</h3>
                <p>320,000</p>
            </span>
        </div>
        <div data-aos='fade-down'>
            <img src={"../../chair7.jpg"}></img>
            <span className={styles.span}>
                <h3>Bedroom Furniture</h3>
                <p>320,000</p>
            </span>
        </div>
    </div>
</div>


<div className={styles.container} >
    <h2 className={styles.sub_title}> Products From Us</h2>

    <div className={styles.exclusives} >
        
        <div data-aos='fade-down'>
            <img src={"../../chair2.jpg"}></img>
            <span className={styles.spans}>
                <h3>Bedroom Furniture</h3>
                
            </span>
           
        </div>
        
        <div data-aos='fade-down'>
            <img src={"../../chair3.jpg"}></img>
            <span className={styles.spans}>
                <h3>Bedroom Furniture</h3>
            </span>
          
        </div>
        
       
        <div data-aos='fade-down'>
            <img src={"../../chair6.jpg"}></img>
            <span className={styles.spans}>
                <h3>Bedroom Furniture</h3>
            </span>
          
        </div>
        <div data-aos='fade-down'>
            <img src={"../../chair7.jpg"}></img>
            <span className={styles.spans}>
                <h3>Bedroom Furniture</h3>
            </span>
            
        </div>


        <div data-aos='fade-down'>
            <img src={"../../chair1.jpg"}></img>
            <span className={styles.spans}>
                <h3>Bedroom Furniture</h3>
            </span>
            
        </div>
        <div data-aos='fade-down'>
            <img src={"../../cabinet.jpg"}></img>
            <span className={styles.spans}>
                <h3>Bedroom Furniture</h3>
            </span>
            
        </div>
        <div data-aos='fade-down'>
            <img src={"../../obaschair.jpg"}></img>
            <span className={styles.spans}>
                <h3>Bedroom Furniture</h3>
            </span>
            
        </div>
        <div data-aos='fade-down'>
            <img src={"../../chair4.jpg"}></img>
            <span className={styles.spans}>
                <h3>Bedroom Furniture</h3>
            </span>
            
        </div>

        <div data-aos='fade-down'>
            <img src={"../../bed2.jpg"}></img>
            <span className={styles.spans}>
                <h3>Bedroom Furniture</h3>
            </span>
            
        </div>
    </div>


    <div className={styles.cta} >
        <h3 data-aos='fade-down'>Comfort <br></br>is life in the  fullest</h3>
        <p data-aos='fade-down'>Our products are cheap,high qaulity <br></br>and are very affordable.</p>
        <a href="" className={styles.cta_btn} data-aos='fade-down' onClick={search}>Know More</a>
    </div>

    <h2 className={styles.sub_title} data-aos='fade-down'> Customers Testimonial</h2>

    <div className={styles.stories} >
        <div data-aos='fade-down'>
            <img src={"../../ag1.jpg"} ></img>
            <p>"Amazing productsi would say...best recommendation"</p>
        </div>

        <div data-aos='fade-down'>
            <img src={"../../b6.jpg"} style={{height:"31vh"}}></img>
            <p>Don't just take the words for granted..try the purchase and feel its taste
            </p>

        </div>

        <div data-aos='fade-down'>
            <img src={"../../imageslider.jpg"} ></img>
            <p>Obas global ..the best and affordable we can say</p>

        </div>
        


        

    </div>

    <a href="" className={styles.start_btn} data-aos='fade-down' onClick={search}>shop now</a>



    <div className={styles.about_msg} data-aos='fade-down'>
        <h2>About Us</h2>
        <p>We deal on all kind of furnitures like chairs,cabinets,wardrobes,beds,office chairs,cages and all kinds of furnitures.We also specialise on roofings and all kinds of water collectors.</p>

    </div>

    <div className={styles.footer} data-aos='fade-down'>
        <a href="https://facebook.com">
            <i className="fa fa-facebook"></i>
            <i className="fa fa-youtube"></i>
            <i className="fa fa-twitter"></i>
            <i className="fa fa-instagram"></i>
        </a>
        <hr></hr>
        <p>Copyright 2022 0bas Furnitures</p>
    </div>


   



</div></>)
}

export default Home