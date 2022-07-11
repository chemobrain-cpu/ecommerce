const express = require('express')
const router = express.Router()
//importing controllers

const { verifyToken}  = require("../utils/util")



const {makePayment,getOrders,getOrder,getUser,modifyUser,getUserOrders} = require("../controller/user")


router.post("/pays",verifyToken,makePayment)
router.get("/orderss",verifyToken,getOrders)
router.get("/userorderss/:id",verifyToken,getUserOrders)
router.get("/orders/:orderid",verifyToken,getOrder)
router.get("/users",verifyToken,getUser)
router.patch("/users",verifyToken,modifyUser)


module.exports.router = router