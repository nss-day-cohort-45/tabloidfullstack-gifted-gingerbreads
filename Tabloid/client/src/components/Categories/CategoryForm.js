import React, { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Button, Row } from "reactstrap";
import { Link } from "react-router-dom";
import "./Category.css"



export const CategoryForm = () => {
    const { addCategory, getAllCategories } = useContext(CategoryContext);



    const [category, setCategory] = useState({
        name: "",
    });

    useEffect(() => {
        getAllCategories();
    }, [])

    const handleControlledInputChange = (event) => {
        const freshCategory = { ...category };

        freshCategory[event.target.id] = event.target.value
        setCategory(freshCategory);
    }

    const handleSave = () => {
        addCategory({
            name: category.name,
        })
            .then(getAllCategories());
    };

    return (
        <section className="post_form">
            <Row>
                <h1>Category</h1>
            </Row>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text" id="name" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Name" value={category.name} />
                </div>
            </fieldset>
            <Button onClick={handleSave}>
                <Link className="saveCategory" to={"/api/category"}>
                    Save Category
                </Link>
            </Button>

        </section>
    )
};

export default CategoryForm