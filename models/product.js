import mongoose from "mongoose";

const Productmodels=new mongoose.Schema(
   {
       title: { type: String, require: true, unique: true},
       desc: { type: String, require: true },
       img: { type: String, require: true},
       categories: { type: Array, require: true, },
       size: { type: String, require: true, },
       color: { type: String, require: true, },
       prize: { type: String, require: true, },
       
   },
   { timestamps: true}
)


const product= mongoose.model("product", Productmodels)
export default product
