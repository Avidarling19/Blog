import express from "express";
import Authcontroller from "../controllers/authcontroller.js";
import Blogcontroller from "../controllers/blogcontroller.js";
import categoryController from "../controllers/Categorycontroller.js";
import multer from "multer";
import checkIsUserAuthenitcated from "../middleware/Middleware.js";

const storage =multer.diskStorage({
    destination : function (req,file,cb){
        cb (null,'public/upload/');
    } ,
  filename : function(req,file,cb){
    cb(null,`${Date.now()}-${file.originalname}`) ;
  },
   
});

const upload = multer({storage:storage});
const router = express.Router();

router.post("/user/register",Authcontroller.userRegistration);
router.post("/user/login",Authcontroller.userLogin);

router.get("/get/allblogs",checkIsUserAuthenitcated,Blogcontroller.getBlog);
router.get("/get/blog/:id",checkIsUserAuthenitcated,Blogcontroller.getSingleBlog);
router.post("/add/blog",upload.single("thumbnail"),checkIsUserAuthenitcated,Blogcontroller.AddBlog);
router.get("/get/category",checkIsUserAuthenitcated,categoryController.getallcategories);
router.post("/add/category",checkIsUserAuthenitcated,categoryController.addCategories);

export default router ; 