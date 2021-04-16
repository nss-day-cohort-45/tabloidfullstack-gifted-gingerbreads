import React, { useContext, useEffect } from "react";
import Category from "./Category";
import { CategoryContext } from "../providers/CategoryProvider"

const CategoryList = () => {
    const { categories, getAllCategorys } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategorys();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="cards-column">
                    {categories.map((category) => (
                        <Category key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryList;