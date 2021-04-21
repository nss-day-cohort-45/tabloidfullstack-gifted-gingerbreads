import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    return fetch("https://localhost:5001/api/Post")
      .then((res) => res.json())
      .then(setPosts);
  };

  const getUserPosts = (userId) => {
    return fetch(`https://localhost:5001/api/Post/GetByUser?userId=${userId}`)
      .then((res) => res.json())
      .then(setPosts);
  }

  const getPostDetails = (postId => {
    return fetch(`https://localhost:5001/api/Post/GetById?postId=${postId}`)
      .then((res) => res.json())
      .then(setPosts);
  });

  const addPost = (post) => {
    return fetch("/api/Post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };

  const getPostById = (postId) => {
    return fetch(`/api/Post/GetById/${postId}`)
      .then((res) => res.json())
  };

  return (
<<<<<<< HEAD
    <PostContext.Provider value={{ posts, getPosts, getUserPosts, getPostDetails, addPost }}>
=======
    <PostContext.Provider value={{ posts, getPosts, getUserPosts, getPostDetails, getPostById }}>
>>>>>>> main
      {props.children}
    </PostContext.Provider>
  );
};