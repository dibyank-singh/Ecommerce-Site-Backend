import express from "express"
const router = express.Router()
import User from "../models/user.js"
import { jwtmiddle, JwtAndAuthMiddleware, JwtAndAdminMiddleware } from "./Jwtmiddleware.js"

router.put("/:id", JwtAndAuthMiddleware, async (req, res) => {

    try {
        const updateduser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updateduser)
    } catch (err) {
        res.status(500).json(err)
    }

})

// Find the Users only by admin

router.get("/find/:id", JwtAndAdminMiddleware, async (req, res) => {

    try {
        const user = await User.findById(req.params.id)

        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    } 

})

// Find All Users

router.get("/", JwtAndAdminMiddleware, async (req, res) => {

    const query= req.query.new

    try {
        const users = query ? await User.find().sort({_id:-1}).limit(1) : await User.find()

        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }

})
// Get user stats 

router.get("/",JwtAndAdminMiddleware,  (req, res)=>{


})

// Delete

router.delete("/:id", JwtAndAuthMiddleware, async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json("The User has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }

})


export default router;