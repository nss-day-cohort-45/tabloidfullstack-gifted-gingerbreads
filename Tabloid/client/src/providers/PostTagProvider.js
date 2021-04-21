import React, { useState } from "react";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
    const [postTags, setPostTags] = useState([]);

    const getAllPostTagsForPost = (postId) => {
        return fetch(`/api/PostTag/Manage-Tags/${postId}`)
            .then((res) => res.json())
    };

    const addPostTag = (tag) => {
        return fetch("/api/PostTag/Add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag)
        });
    };

    const deletePostTag = postTagId => {
        return fetch(`/api/PostTag/Delete/${postTagId}`, {
            method: "DELETE"
        })
            .then(getAllPostTagsForPost)
    };


    return (
        < PostTagContext.Provider value={{ postTags, getAllPostTagsForPost, addPostTag, deletePostTag }}>
            {props.children}
        </PostTagContext.Provider >
    );
};