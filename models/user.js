 import mongoose from "mongoose";

 const Usermodels=new mongoose.Schema(
    {
        username: { type: String, require: true, unique: true},
        email: { type: String, require: true, unique: true},
        phone: { type: Number, require: true, unique: true},
        password: { type: String, require: true, },
        isAdmin: { type:Boolean, default: false}
    },
    { timestamps: true}
 )

 
 const User= mongoose.model("user", Usermodels)
 export default User 