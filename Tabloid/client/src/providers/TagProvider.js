import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);

    const getAllTags = () => {
        return fetch("/api/tag")
            .then((res) => res.json())
            .then(setTags);
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

    const deleteTag = tagId => {
        return fetch(`api/tag/delete/${tagId}`, {
            method: "DELETE"
        })
            .then(getAllTags)
    }

    const editTag = tagId => {
        return fetch(`/api/Tag/delete/${tagId}}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tagId)
        })
            .then(getAllTags)
    }



    return (
        < TagContext.Provider value={{ tags, getAllTags, addTag, deleteTag, editTag }}>
            {props.children}
        </TagContext.Provider >
    );
};