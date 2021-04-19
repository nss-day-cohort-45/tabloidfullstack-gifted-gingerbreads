import React, { useState } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);
    /*
        Above line: Array destructoring, useState is returning what is declared 
        in the (), so in this instance it will be returning an array with a 0 
        index and a 1 index. 0 index is the state and 1 index is the function used
        to set state
    */


    const getAllCommentsByPostId = (postId) => {
        return fetch(`/comments/${postId}`)      // endpoints may need to change
            .then((res) => res.json())
            .then(setComments);
    };



    const getCommentById = (commentId) => {
        return fetch(`/comment/${commentId}`)
            .then((res) => res.json())
    }


    const addComment = (comment) => {
        return fetch("/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });
    };


    const editComment = (comment) => {
        return fetch(`/comment/edit/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        })
    }



    const deleteComment = (commentId) => {
        return fetch(`/comments/${commentId}`, {
            method: "DELETE"
        })
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