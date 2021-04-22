import userEvent from "@testing-library/user-event";
import React, { useContext, useState } from "react";
import { UserProfileContext } from "./UserProfileProvider"

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([]);
    const { getToken } = useContext(UserProfileContext);
    const apiUrl = "/api/category";

    const getAllCategories = () =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json())
                .then(setCategories));

    const getCategoryById = (id) => {
        return fetch(`/api/category/${id}`)
            .then((res) => res.json())
    };

    const addCategory = (category) =>
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(category)
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized");
            }));

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
        return fetch(`/api/category/delete/${category.id}`, {
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

