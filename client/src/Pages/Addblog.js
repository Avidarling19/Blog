
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const AddBlog = () => {
  
   const Navigate = useNavigate();
  const [input ,setInput]= useState({
          title :"",
          description : "",
          category : ""
  });
   const[File,SetFile]= useState([]);
  const [categories, setcategories]=  useState([]);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await axios.get("http://localhost:9000/api/vi/get/category",{
      headers : {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    }
      );
      setcategories(res.data) ;
    };
   fetchAllCategories(); },
   []) ;
   //creating form data

   const formdata = new FormData();
     formdata.append("title",input.title);
     formdata.append("category",input.category);
     formdata.append("description",input.description);
     formdata.append("thumbnail",File);
     
     
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
            const res = await axios.post("http://localhost:9000/api/vi/add/blog",formdata,
            {
              headers : {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
              },
            }
            );
            alert(res.data.message);
            Navigate("/");
            
    }catch(error)
    {
      alert(error.response.data.message);
    }

    // Handle form submission here
  };

  return (
    <div className="container shadow">
      <h2 className="text-center my-3">Add A New Blog</h2>
      <div className='col-xl-12 my-3 d-flex items-center justify-content-center'>
        <div className='row'>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='formGroupExampleInput' className='form-label'>
                Title
              </label>
              <input
                type='text'
                name='title'
                value={input.title}
                onChange={(e)=> {
                  setInput( { ...input ,[e.target.name] : e.target.value})
                }}
                className='form-control'
                id='formGroupExampleInput'
                placeholder='Blog Title'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='formGroupExampleInput2' className='form-label'>
                Category
              </label>
              <select className='form-control' name='category'
              onChange={(e)=> {
                setInput( { ...input ,[e.target.name] : e.target.value})
              }}>
                <option disabled>Select Category</option>
                { categories && categories.map((item) => {
                 return <option value= {item._id}> {item.title}</option>
                })}
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='formGroupExampleInput2' className='form-label'>
                Description
              </label>
              <textarea
              value={input.description}
              onChange={(e)=> {
                setInput( { ...input ,[e.target.name] : e.target.value})
              }}
                name='description'
                className='form-control'
                placeholder='Blog Description'
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='formGroupExampleInput2' className='form-label'>
                Thumbnail
              </label>
              <input
                name="thumbnail"
                type="file"
                onChange={(e)=>  SetFile(e.target.files[0])}
                className='form-control'
                id='formGroupExampleInput'
                placeholder='Select Thumbnail'
              />
            </div>
            <div className='mb-3'>
              <button type="submit" className='btn btn-primary btn-block'>
                Add Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
