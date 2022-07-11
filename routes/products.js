const express = require('express')
const router = express.Router()
//importing controllers
const { verifyToken}  = require("../utils/util")

const { body, validationResult,Result } = require('express-validator')

const {getProducts,getProduct,getProductComment,getProductsCategory,readNotification } = require("../controller/product")


router.get("/productss/:category",getProductsCategory)
router.get("/productss",getProducts)
router.get("/products/:id",getProduct)
router.get("/comments/:id",getProductComment)
router.patch("/notifications",readNotification)


module.exports.router = router
