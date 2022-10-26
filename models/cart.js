import mongoose from "mongoose";

const Cartmodels=new mongoose.Schema(
   {
       userId : { type: String, require: true},
       products: [
        {
             productId: {
           type: String ,

        },
        quantity: {
            type : Number, 
            default : 1,
        }
    }
       ],
   
       
   },
   { timestamps: true}
)


const Cart= mongoose.model("Cart", Cartmodels)
export default Cart