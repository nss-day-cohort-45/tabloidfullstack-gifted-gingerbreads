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
      return fetch(`https://localhost:5001/api/Post/${userId}`)
        .then((res) => res.json())
        .then(setPosts);
  }

  return (
    <PostContext.Provider value={{ posts, getPosts, getUserPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};