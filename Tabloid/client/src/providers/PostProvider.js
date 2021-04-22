import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getPosts = () => {
    
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
    return fetch("https://localhost:5001/api/Post", {
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
    <PostContext.Provider value={{ posts, getPosts, getUserPosts, getPostDetails, getPostById, addPost }}>
      {props.children}
    </PostContext.Provider>
  );
};