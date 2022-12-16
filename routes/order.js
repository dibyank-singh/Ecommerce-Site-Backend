import express from "express"
const router = express.Router()
import Order from "../models/order.js"
import { jwtmiddle, JwtAndAuthMiddleware, JwtAndAdminMiddleware } from "./Jwtmiddleware.js"

// Create order by all

router.post("/", jwtmiddle, async(req, res)=>{
    const newOrder=new Order(req.body)

try{
    const SavedOrder= await newOrder.save()
    res.status(200).json(SavedOrder)
}catch(err){
    res.status(500).json(err)
}
})

// Update the order by admin only

router.put("/:id", JwtAndAdminMiddleware, async (req, res) => {

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }

})

// Find the Order by Id

router.get("/find/:userId", JwtAndAuthMiddleware,  async (req, res) => {

    try {
        const findorder = await Order.find({userId: req.params.id})
        res.status(200).json(findorder)
    } catch (err) {
        res.status(500).json(err)
    } 

})

// Find All Cart

router.get("/", JwtAndAdminMiddleware, async (req, res) => {
    try {
      
          AllorderData=await Order.find()
        res.status(200).json(AllorderData)
    } catch (err) {
        res.status(500).json(err)
    }

})

// // Get user stats 

// router.get("/",JwtAndAdminMiddleware,  (req, res)=>{


// })

// // Delete

//  Delete Product by Admin only..
router.delete("/:id", JwtAndAdminMiddleware, async (req, res) => {

    try {
        await Order.findByIdAndDelete(req.params.id)

        res.status(200).json("The order has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }

})

// Get monthly income data by admin

router.get("/income", JwtAndAdminMiddleware, async(req,res)=>{

    const date= new Date()
    const lastmonth= new Date(date.setMonth(date.getMonth( )- 1))
    const preMonth= new Date(lastmonth.setMonth(lastmonth.getMonth()- 1))

    try{
        const income= await Order.aggregate([
            {$match:{createdAt: {$gte: preMonth}}},
            {$project:{month: {$month: "createdAt" }}, sales:"$amount" },

            { $group : {
                _id:"$month",
                total: { $sum: "$sales"}
            }}
            
        ])

        res.status(200).json(income)

    }catch(err){
        res.status(400).json(err)
    }

})

export default router;