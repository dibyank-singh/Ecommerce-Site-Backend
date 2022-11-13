import express from "express"
import product from "../models/product.js"
const router = express.Router()
import Product from "../models/product.js"
import { jwtmiddle, JwtAndAuthMiddleware, JwtAndAdminMiddleware } from "./Jwtmiddleware.js"


// Create products only be Admin

router.post("/", JwtAndAdminMiddleware , async(req, res)=>{
    const newProducts=new Product(req.body)

try{
    const SavedProducts= await newProducts.save()
    res.status(200).json(SavedProducts)
}catch(err){
    res.status(500).json(err)
}

})

// Update the Products by Admin Only

router.put("/:id", JwtAndAdminMiddleware, async (req, res) => {

    try {
        const updatedProducts = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedProducts)
    } catch (err) {
        res.status(500).json(err)
    }

})

// // Find the Products by All

router.get("/find/:id",  async (req, res) => {

    try {
        const findProducts = await Product.findById(req.params.id)

        res.status(200).json(findProducts)
    } catch (err) {
        res.status(500).json(err)
    } 

})

// Find All Users

router.get("/",  async (req, res) => {

    const newq= req.query.new
    const newcategories= req.query.category


    try {
       let Products;

       if(newq){
        Products= await Product.find().sort({createdAt: -1}).limit(1)
       }else if(newcategories){
        Products= await Product.find(
            {
                categories: {
                    $in:[newcategories]
                }
            }
        )
       }
       else 
       Products= await Product.find()

        res.status(200).json(Products)
    } catch (err) {
        res.status(500).json(err)
    }

})

// // Get user stats 

// router.get("/",JwtAndAdminMiddleware,  (req, res)=>{


// })

// // Delete

router.delete("/:id", JwtAndAdminMiddleware, async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json("The Products has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }

})


export default router;