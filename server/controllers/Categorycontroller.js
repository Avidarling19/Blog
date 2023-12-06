
import categoryModel from "../models/categorymodel.js";

class categoryController {

    static getallcategories = async (req,res) =>  {

        try {
            
            const Allcategories = await categoryModel.find({});
            res.status(200).json(Allcategories);

        }
        catch (error) {
            res.status(400).json({message : error.message}) ;
        }
    }
    static addCategories = async (req,res) => {

        try {
             
            const title = req.body.title ;
            if(title)
            {
                 const newCategory = new categoryModel({
                    title ,
                 });
                 const savedCateogry = newCategory.save();
                 if(savedCateogry)
                 {
                    res.status(200).json({message: "Category added sucesfully"});
                 }
               }
            else {
                res.status(400).json({message : "All fields are required"}); 
            }
        }
        catch (error){
            res.status(400).json({message : error.message});

        }
    }
}
export default categoryController ;