import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostTagContext = React.createContext();

export const PostTagProvider = (props) => {
    const [postTags, setPostTags] = useState([]);
    const { getToken } = useContext(UserProfileContext);


    const getAllPostTagsForPost = (postId) => {
        return getToken().then((token) =>
            fetch(`/api/PostTag/Manage-Tags/${postId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))
    };

    const addPostTag = (postTag) => {
        return getToken().then((token) =>
            fetch("/api/PostTag/Add", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postTag)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            })
        )
    };

    const deletePostTag = postTagId => {
        return getToken().then((token) =>
            fetch(`/api/PostTag/Delete/${postTagId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            })
                .then(getAllPostTagsForPost))
    };


    return (
        < PostTagContext.Provider value={{ postTags, getAllPostTagsForPost, addPostTag, deletePostTag }}>
            {props.children}
        </PostTagContext.Provider >
    );
};