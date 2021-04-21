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
  })

  const getPostsByCategoryId = (categoryId) => {
    return fetch(`https://localhost:5001/api/Post/getByCategory?categoryId=${categoryId}`)
      .then((res) => res.json())
      .then(setPosts);
  }

  return (
    <PostContext.Provider value={{ posts, getPosts, getUserPosts, getPostDetails, getPostsByCategoryId }}>
      {props.children}
    </PostContext.Provider>
  );
};