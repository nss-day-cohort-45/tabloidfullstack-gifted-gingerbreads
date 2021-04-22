import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";


export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [comments, setComments] = useState([]);
    /*
        Above line: Array destructoring, useState is returning what is declared 
        in the (), so in this instance it will be returning an array with a 0 
        index and a 1 index. 0 index is the state and 1 index is the function used
        to set state
    */


    const getAllCommentsByPostId = (postId) => {
        return getToken().then((token) =>
            fetch(`/comments/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setComments));
    };


    const getCommentById = (commentId) => {
        return getToken().then((token) =>
            fetch(`/comment/${commentId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))
    };



    const addComment = (comment) => {
        return getToken().then((token) =>
            fetch(`/comment/${comment.postId}/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            })
        )
    };



    const editComment = (comment) => {
        return getToken().then((token) =>
            fetch(`/comment/${comment.id}/edit`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            })
        )
    };





    const deleteComment = (commentId) => {
        return getToken().then((token) =>
            fetch(`/comment/delete/${commentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }))
    };



    return (
        <CommentContext.Provider value={{
            comments, getAllCommentsByPostId, getCommentById,
            addComment, editComment, deleteComment
        }}>
            {props.children}
        </CommentContext.Provider>
    );
};