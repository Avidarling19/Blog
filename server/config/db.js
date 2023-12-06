import mongoose from "mongoose";
const  connectToMango =async() => {

    const res = await mongoose.connect("mongodb://127.0.0.1:27017/blog-mern-project") ;

    if(res)
    {
        console.log("Sucesfully Connected");
    }
};

export default connectToMango ;