import React, { useContext, useEffect } from "react";
import { CategoryContext } from "../../providers/CategoryProvider"
import Category from "./Category";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";


const CategoryList = () => {
    const { categories, getAllCategories } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (

        <div className="container">
            <Button className="btn" variant="secondary" size="sm">
                <Link className="newCategory" to={"/category/addnew"}>
                    Add Category
                </Link>
            </Button>
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