import React, { useState } from "react";

export const TagContext = React.createContext();

export const TagProvider = (props) => {
    const [tags, setTags] = useState([]);

    const getAllTags = () => {
        return fetch("/api/tag")
            .then((res) => res.json())
            .then(setTags);
    };

    return (
        < TagContext.Provider value={{ tags, getAllTags }}>
            {props.children}
        </TagContext.Provider >
    );
};