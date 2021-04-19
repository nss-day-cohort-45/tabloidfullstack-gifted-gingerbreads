import React, { useState } from "react";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);

    const getAllCategories = () => {
        return fetch("/api/category")
            .then((res) => res.json())
            .then(setCategories);
    };
    const getCategoryById = (id) => {
        return fetch(`/api/category/${id}`)
            .then((res) => res.json())
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

    const editCategory = (category) => {
        return fetch(`/api/Category/${category.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        })
            .then(getAllCategories())
    };

    const deleteCategory = (category) => {
        return fetch(`/api/category/${category.id}`, {
            method: "DELETE",
        })
            .then(getAllCategories())
    };

    return (
        <CategoryContext.Provider value={{ categories, getAllCategories, addCategory, editCategory, getCategoryById, deleteCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
};
export default CategoryProvider;