import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);
    const { getToken } = useContext(UserProfileContext);

    const getAllTags = () => {
        return getToken().then((token) =>
            fetch("/api/tag", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json())
                .then(setTags));
    };

    const getTagById = (tagId) => {
        return getToken().then((token) =>
            fetch(`/api/tag/${tagId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then((res) => res.json()))

    };

    const addTag = (tag) => {
        return getToken().then((token) =>
            fetch("/api/tag/add", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tag)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            })
        )
    };


    const editTag = tag => {
        return getToken().then((token) =>
            fetch(`/api/tag/edit/${tag.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tag)
            })
                .then(getAllTags))
    };

    const deleteTag = tagId => {
        return getToken().then((token) =>
            fetch(`/api/tag/delete/${tagId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(getAllTags))
    };


    return (
        < TagContext.Provider value={{ tags, getAllTags, getTagById, addTag, deleteTag, editTag }}>
            {props.children}
        </TagContext.Provider >
    );
};