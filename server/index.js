import express from "express";
import connectToMango from "./config/db.js";
import authRoutes from "./routes/blog.js";
import cors from "cors";
const app = express();
const PORT = 9000 ;

connectToMango();
app.use(cors());
app.use(express.json());
app.use(express.static("public/upload"));
app.get("/",(req,res) =>{

    res.send("API is running");
}) ;

app.use("/api/vi",authRoutes);
app.listen(PORT ,() =>{
    console.log('Api is running on http://localhost:9000') ;
}) ;
