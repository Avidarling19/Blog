import mongoose from "mongoose";

const blogschema= mongoose.Schema(
    {
        title : {
            type: String,
        },
        thumbnail :{
            type : String ,
        },
        description :{
            type : String ,
        },
        category :{
            type : mongoose.Schema.Types.ObjectId,
            refer : "categories ",
        },
        user :{
            type: mongoose.Schema.Types.ObjectId,
            ref : "users",
        },
   }
);
const blogmodel = mongoose.model("blogs",blogschema);
export default blogmodel;
