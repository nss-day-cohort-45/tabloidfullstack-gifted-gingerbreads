import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  const getPosts = () => {
    return getToken().then((token) =>
      fetch("https://localhost:5001/api/Post", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then(setPosts));
  };

  const getUserPosts = (userId) => {
    return getToken().then((token) =>
      fetch(`https://localhost:5001/api/Post/GetByUser?userId=${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then(setPosts));
  };

  const getPostDetails = (postId) => {
    return getToken().then((token) =>
      fetch(`https://localhost:5001/api/Post/GetById/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }))
      .then((res) => res.json())
  };

  const addPost = (post) => {
    return getToken().then((token) =>
      fetch("https://localhost:5001/api/Post/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      }).then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Unauthorized");
      })
    )
  };

  const getPostsByCategoryId = (categoryId) =>
    getToken().then((token) =>
      fetch(`https://localhost:5001/api/Post/getByCategory?categoryId=${categoryId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json())
        .then(setPosts))


  const getPostById = (postId) =>
    getToken().then((token) => fetch(`https://localhost:5001/api/Post/GetById?postId=${postId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then(setPosts))


  const editPost = (post) =>
    getToken().then((token) =>
      fetch(`https://localhost:5001/api/post/${post.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      })
        .then(getPostById(post.id)))

  return (
    <PostContext.Provider value={{ posts, getPosts, getUserPosts, getPostDetails, getPostById, getPostsByCategoryId, addPost, editPost }}>
      {props.children}
    </PostContext.Provider>
  );
};