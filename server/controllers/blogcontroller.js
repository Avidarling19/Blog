import blogmodel from "../models/blogmodel.js";

class Blogcontroller {

    static getBlog = async (req,res)=>{
        console.log(req);

        try {
            const allfetchblogs = await blogmodel.find({user : req.user._id});
            return res.status(200).json(allfetchblogs); 
        }
        catch (error)
        {
             return res.status(400).json({message : error.message});
        }
    } ;
    static AddBlog = async (req,res)=>{
        console.log("Request Body:", req.body); // Log the request body
        console.log("Request File:", req.file);
        const {title,category,description} = req.body ;
        try {
            if(title && category && description )
            {
                 const addBlog = new blogmodel(
                    {
                        title : title ,
                        description : description ,
                        category : category ,
                        thumbnail : req.file.filename ,
                        user : req.user._id ,
                    }
                 )
                 const savedblog = await addBlog.save();
                 if(savedblog)
                 {
                    return res.status(200).json({message : "Blog saved sucessfully"});
                 }
                 else {
                    return res.status(400).json({ message: "All fields are required"}) ;
                 }
            }
            else {
                        return res.status(400).json({message : "All fields are required"});
            }
        }
        catch(error)
        {
            return res.status(400).json({message: error.message});
        }
    };

    static getSingleBlog = async (req, res) => {
        const { id } = req.params;
        console.log('asdas');
        return res.status(200)
        try {
            if (id) {
                const fetchblogsbyid = await blogmodel.findById(id);
                if (fetchblogsbyid) {
                    return res.status(200).json(fetchblogsbyid);
                } else {
                    return res.status(404).json({ message: "Blog not found" });
                }
            } else {
                return res.status(400).json({ message: "Invalid Url" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
}
export default Blogcontroller ;