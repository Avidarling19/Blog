import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const FetchAllBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/vi/get/allblogs", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    FetchAllBlogs();
  }, []);

  return (
    <>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Latest posts</strong>
            </h2>
            <div className="row">
            { console.log("Blogs:", blogs)}
              {blogs && blogs.length > 0 ? (
                blogs.map((item) => (
                  <div className="col-lg-4 col-md-12 mb-4" key={item._id}>
                    <div className="card">
                      <div className="bg-image hover-overlay ripple">
                        <img
                          src={`http://localhost:9000/${item.thumbnail}`}
                          className="img-fluid"
                          alt="Demo"
                        />
                        <a href="#!">
                          <div
                            className="mask"
                            style={{
                              backgroundColor: "rgba(251, 251, 251, 0.15)",
                            }}
                          ></div>
                        </a>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <Link to={`/blog/${item._id}`} className="btn btn-primary">
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>Loading....</h2>
              )}
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-primary text-lg-start">
        <div
          className="text-center p-3 text-white"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright :{" "}
          <a className="text-white mx-2" href="https://mdbootstrap.com/">
             Genesis
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
