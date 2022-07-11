import React,{useEffect} from 'react'
import styles from './productsection.module.css'

import Product from "../product_section/product"

import Container from "../horizontal_cards/card_container"
import Aos from "aos"
import 'aos/dist/aos.css'

let ProductSection = () => {
    useEffect(() => {
        Aos.init({ duration: 1500, offset: 20 }, [])
    })
    

    return (<div className={styles.productsection} data-aos='fade-down'>
            <Container className={styles.productContainer} >
                <Product
                    imageUrl="../../chair5.jpg"
                    amount="66090"
                />
                <Product
                    imageUrl="../../deck.jpg"
                    amount="66090"
                />
                <Product
                    imageUrl="../../bed.jpg"
                    amount="66090"
                />
                <Product
                    imageUrl="../../wardrobe.jpg"
                    amount="66090"
                />
                <Product
                    imageUrl="../../wardrobe2.jpg"
                    amount="66090"
                />

            </Container>


        </div>)
}

export default React.memo(ProductSection)