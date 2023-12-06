import authModel from "../models/authmodel.js";
import bcryptjs from 'bcryptjs';
import  jwt  from "jsonwebtoken";
class Authcontroller {

    static userRegistration = async(req,res)=> {

        const {username ,email,password} = req.body ;
        try {
               if(username && email && password)
               {
                const isuser = await authModel.findOne({email: email});
                if(!isuser)
                {
                      const gensalt  = await bcryptjs.genSalt(10);
                      const hashedPassword = await bcryptjs.hash(password,gensalt);

                      const newUser = authModel({
                        username,email,password : hashedPassword}) ;

                const saveduser = await newUser.save();
                if(saveduser)
                {
                    return res.status(200).json({message : "User Registration Sucessful"});
                }
                   
                }
                else {
                    return res.status(400).json({message : "User already registered"});
                }
               }
               else {
                return res.status(400).json({message : "Please fill all the fields"});
               }
        }
        catch (error) {
            
            return res.status(400).json({ message  : error.message});
        }
        res.send("user registration") ;
    };

    static userLogin = async (req, res) => {
        const { email, password } = req.body;
    
        if (email && password) {
            try {
                const isemail = await authModel.findOne({ email: email });
    
                if (isemail) {
                    const passwordMatch = await bcryptjs.compare(password, isemail.password);
    
                    if (passwordMatch) {
                        const token = jwt.sign({ userID: isemail._id }, "pleasesubscribe", { expiresIn: "2d" });
                        return res.status(200).json({ message: "Login successfully", token, name: isemail.username });
                    } else {
                        return res.status(400).json({ message: "Wrong credentials" });
                    }
                } else {
                    return res.status(400).json({ message: "Email not registered" });
                }
            } catch (error) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        } else {
            return res.status(400).json({ message: "All fields are required" });
        }
    };
    
}
export default Authcontroller ;