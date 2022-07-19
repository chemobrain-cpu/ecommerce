const express = require('express')
const router = express.Router()
//importing controllers
const { verifyToken}  = require("../utils/util")

const { body, validationResult,Result } = require('express-validator')

const {getProducts,getProduct,getProductComment,getProductsCategory,readNotification } = require("../controller/product")


router.get("/auth/products/:category",getProductsCategory)
router.get("/auth/products",getProducts)
router.get("/auth/product/:id",getProduct)
router.get("/auth/comment/:id",getProductComment)
router.patch("/auth/notification",readNotification)


module.exports.router = router
