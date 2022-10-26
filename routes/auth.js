import express from "express"
import User from "../models/user.js"
import jwt from "jsonwebtoken"
const router = express.Router()


// Resiter route

router.post("/register", async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if(exist) {
            return response.status(401).json({ message: 'User already exist'});
        }
        const user = request.body;
        const newUser = new User(user);
        let data= await newUser.save();
        // console.log(data)
        
        const accesstoken= jwt.sign({  
            id:data._id,
            isAdmin: data.isAdmin,
        },
        process.env.JWT_SEC,
        
        { expiresIn: "3d" }
        ) 

        response.status(200).json({ ...data._doc, accesstoken});
        
    } catch (error) {
        response.status(500).json({ message: error.message });
    }

})
 
// Login  

router.post("/login", async(request , response)=>{ 


    try{
      
         const { username, password}= request.body
         
         if(!(username && password)){
            response.status(400).json("Please fill all the credentials..")
         }

        //  Find user
       const data= await User.findOne({username, password})
    
    //    Validate user 

      if(data){
         
        const accesstoken= jwt.sign({  
            id:data._id,
            isAdmin: data.isAdmin,
        },
        process.env.JWT_SEC,
        
        { expiresIn: "3d" }
        )  
    
        return response.status(200).json({...data._doc, accesstoken});
      }
      return  response.status(400).json("Invalid Credentials");


    }catch(err){
       response.status(401).json(err)
    }



})

export default router; 