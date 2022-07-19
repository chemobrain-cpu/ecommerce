const express = require('express')
const router = express.Router()
//importing controllers

const { verifyToken}  = require("../utils/util")



const {makePayment,getOrders,getOrder,getUser,modifyUser,getUserOrders} = require("../controller/user")


router.post("/auth/pay",verifyToken,makePayment)
router.get("/auth/orders",verifyToken,getOrders)
router.get("/auth/userorders/:id",verifyToken,getUserOrders)
router.get("/auth/order/:orderid",verifyToken,getOrder)
router.get("/auth/user",verifyToken,getUser)
router.patch("/auth/user",verifyToken,modifyUser)


module.exports.router = router