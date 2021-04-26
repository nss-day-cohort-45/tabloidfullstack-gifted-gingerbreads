import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

  const getPosts = () => {
    return getToken().then((token) =>
      fetch("/api/Post", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then(setPosts));
  };

  const getUserPosts = () => {
    return getToken().then((token) =>
      fetch(`/api/Post/GetByUser?userId=${userProfile.id}`, {
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
      fetch(`/api/Post/GetById?postId=${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json())
        .then(setPosts));
  };

  const addPost = (post) => {
    return getToken().then((token) =>
      fetch("/api/Post/add", {
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

  const deletePost = (postId) => {
    return getToken().then((token) =>
      fetch(`/api/Post/delete/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postId),
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


  const getPostById = (postId) => {
    return fetch(`/api/Post/GetById/${postId}`)
      .then((res) => res.json())
  };

  return (
    <PostContext.Provider value={{ posts, getPosts, getUserPosts, getPostDetails, getPostById, getPostsByCategoryId, addPost, deletePost }}>
      {props.children}
    </PostContext.Provider>
  );
};