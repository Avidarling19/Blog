import jwt from "jsonwebtoken";
import authModel from "../models/authmodel.js";

const checkIsUserAuthenitcated = async(req,res,next) =>
{
          let token ;
          const {authorization} = req.headers ;

          if(authorization && authorization.startsWith("Bearer"))
          {
            try {
                token = authorization.split(" ")[1];
                // verify token 
                const {userID} = jwt.verify(token, "pleasesubscribe");
                // Get User from token   
            req.user= await authModel.findById(userID).select("--password");
      
                next();
            }
            catch(error)
            {
                return res.status(401).json({message:"Unauthorised user"});
            }
          }
          else {
            return res.status(401).json({message:"Unauthorised user"});
          }
}
export default checkIsUserAuthenitcated ;