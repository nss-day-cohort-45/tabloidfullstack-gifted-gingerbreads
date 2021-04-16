import React, { useState } from "react";

export const CommentContext = React.createContext();

export const CommentProvider = (props) => {
    const [comments, setComments] = useState([]);


    const getAllCommentsByPostId = () => {
        return fetch("/api/comment")      // endpoints may need to change
            .then((res) => res.json())
            .then(setComments);
    };


    const addComment = (comment) => {
        return fetch("/api/comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post),
        });
    };


    const editComment = (comment) => {
        return fetch(`/api/comment/${comment.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        })
    }



    const deleteComment = (commentId) => {
        return fetch(`/api/comment/${commentId}`, {
            method: "DELETE"
        })
    };


    return (
        <CommentContext.Provider value={{
            comments, getAllCommentsByPostId, addComment, editComment, deleteComment
        }}>
            {props.children}
        </CommentContext.Provider>
    );
};