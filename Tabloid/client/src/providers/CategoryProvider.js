import React, { useState } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);

    const getAllCategories = () => {
        return fetch("/api/category")
            .then((res) => res.json())
            .then(setCategories);
    };

    const addCategory = (category) => {
        return fetch("/api/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        });
    };
    return (
        <CategoryContext.Provider value={{ categories, getAllCategories, addCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
};
export default CategoryProvider;