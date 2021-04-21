import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);

    const getAllTags = () => {
        return fetch("/api/tag")
            .then((res) => res.json())
            .then(setTags);
    };

    const getTagById = (tagId) => {
        return fetch(`/api/tag/${tagId}`)
            .then((res) => res.json())

    };

    const addTag = (tag) => {
        return fetch("/api/tag/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(tag)
        });
    };

    const editTag = tag => {
        return fetch(`/api/tag/edit/${tag.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
            .then(getAllTags)
    };

    const deleteTag = tagId => {
        return fetch(`/api/tag/delete/${tagId}`, {
            method: "DELETE"
        })
            .then(getAllTags)
    };


    return (
        < TagContext.Provider value={{ tags, getAllTags, getTagById, addTag, deleteTag, editTag }}>
            {props.children}
        </TagContext.Provider >
    );
};