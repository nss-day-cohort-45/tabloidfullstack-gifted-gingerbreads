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

    const getCategoryById = (id) =>
        getToken().then((token) =>
            fetch(`/api/category/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                }
            }).then((res) => res.json())
                .then(setCategories));



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

    const editCategory = (category) =>
        getToken().then((token) =>
            fetch(`/api/Category/${category.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category),
            }).then(resp => {
                if (resp.ok) {
                    return resp.json();
                }
                throw new Error("Unauthorized")
            }))
            .then(getAllCategories())


    const deleteCategory = (category) =>
        getToken().then((token) =>
            fetch(`/api/category/delete/${category.id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }

            }))
            .then(getAllCategories())


    return (
        <CategoryContext.Provider value={{ categories, getAllCategories, addCategory, editCategory, getCategoryById, deleteCategory }}>
            {props.children}
        </CategoryContext.Provider>
    );
};
export default CategoryProvider;

