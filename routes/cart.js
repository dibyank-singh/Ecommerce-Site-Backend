import express from "express"
const router = express.Router()
import Cart from "../models/cart.js"
import { jwtmiddle, JwtAndAuthMiddleware, JwtAndAdminMiddleware } from "./Jwtmiddleware.js"

// Create cart by all

router.post("/", JwtAndAuthMiddleware, async(req, res)=>{
    const newCart=new Cart(req.body)

try{
    const SavedCart= await newCart.save()
    res.status(200).json(SavedCart)
}catch(err){
    res.status(500).json(err)
}

})

// Update the cart by user

router.put("/:id", JwtAndAuthMiddleware, async (req, res) => {

    try {
        const updatedCart = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err)
    }

})

// Find the Products by Id

router.get("/find/:userId", JwtAndAuthMiddleware,  async (req, res) => {

    try {
        const findCart = await Cart.findOne({userId: req.params.id})
        res.status(200).json(findCart)
    } catch (err) {
        res.status(500).json(err)
    } 

})

// Find All Cart

router.get("/", JwtAndAdminMiddleware, async (req, res) => {
    try {
      
          AllCartData=await Cart.find()
        res.status(200).json(AllCartData)
    } catch (err) {
        res.status(500).json(err)
    }

})

// // Get user stats 

// router.get("/",JwtAndAdminMiddleware,  (req, res)=>{


// })

// // Delete

//  Delete Product by Admin only..
router.delete("/:id", JwtAndAuthMiddleware, async (req, res) => {

    try {
        await Cart.findByIdAndDelete(req.params.id)

        res.status(200).json("The Cart has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }

})


export default router;