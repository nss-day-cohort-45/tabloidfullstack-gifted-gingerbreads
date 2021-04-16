import React, { useState } from "react";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    return fetch("https://localhost:5001/api/Post")
      .then((res) => res.json())
      .then(setPosts);
  };

  return (
    <PostContext.Provider value={{ posts, getPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};