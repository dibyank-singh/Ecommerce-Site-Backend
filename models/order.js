import mongoose from "mongoose";

const Ordermodels=new mongoose.Schema(
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
   
       amount : {
        type : Number,
        require : ture
       },
       address : { type:Object , require: ture, },
       
       status : { type:String , default: "Pending", }
       
   },
   { timestamps: true}
)


const order= mongoose.model("order", Ordermodels)
export default order;