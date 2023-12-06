
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login.js';
import Home from './Pages/Home.js';
import Header from './Components/Header.js';
import Addblog from './Pages/Addblog.js';
import Addcategory from './Pages/Addcategory.js';
import SingleBlog from './Pages/Singleblog.js';
import PrivateRoute from './Services/Protected.js';
const App = () => {

  const [selectedPost, setSelectedPost] = useState({
    id: 1,
    title: 'Example Post',
    description: 'This is an example post.',
    thumbnail: 'example.jpg',
    publishedDate: '2023-10-31',
  });

  const navigate = () => {
    // Implement your navigation logic here
    console.log('Navigating back to posts');
  };
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path = "/" element={<PrivateRoute/>}>
        <Route path="/" element={<Home />} /> 
        <Route path="/add-blog" element={<Addblog />} />
        <Route path="/add-category" element={<Addcategory />} />
        <Route
          path="/blog/:id"
          element={<SingleBlog post={selectedPost} navigate={navigate} />}
        />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


