import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchSingleBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/v1/get/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Fetched data:", res.data); // Check fetched data in console
        setBlog(res.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchSingleBlog();
  }, [id]);

  console.log("Blog state:", blog); // Check blog state in console

  return (
    <>
      <div className="container shadow my-3">
        <div className="col-md-12 d-flex items-center justify-content-center bg-light">
          <div className="row">
            <h1 className="my-3">{blog.title}</h1>
            <p className="my-3">Published Date: {blog.publishedDate}</p>
            <img
              src={`http://localhost:9000/${blog.thumbnail}`}
              className="img img-responsive img-rounded my-3"
              alt=""
            />
          </div>
          <p className="my-3">{blog.description}</p>
        </div>
      </div>
      <button onClick={() => navigate("/")} className="btn btn-primary">
        Back To Post
      </button>
    </>
  );
};

export default SingleBlog;
