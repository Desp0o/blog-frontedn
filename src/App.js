import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import Main from "./pages/Main"; 
import Navbar from "./components/navbar/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Recipes from "./pages/Recipes";
import PrivateRoutes from "./components/privateRoutes/PrivateRoutes";
import Profile from "./pages/Profile";
import SignlePost from "./pages/SignlePost";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";


import 'react-quill/dist/quill.snow.css';

function App() {


  return (
   <>
   <Navbar />
    <Routes>
      <Route exact path="/" element={<Main />} />
      <Route exact path="/pages/SignIn" element={<SignIn />} />
      <Route exact path="/pages/SignUp" element={<SignUp />} />
      <Route exact path="/pages/Recipes" element={<Recipes />} />
      <Route exact path="/pages/singlepost/:postId" element={<SignlePost />} />
      
      <Route element={<PrivateRoutes />}>
        <Route exact path="/pages/Profile" element={<Profile />} />
        <Route exact path="/pages/CreatePost" element={<CreatePost />} />
        <Route exact path="/pages/EditPost/:postId" element={<EditPost />} />
      </Route>
    </Routes>
   </>
  );
}

export default App;
